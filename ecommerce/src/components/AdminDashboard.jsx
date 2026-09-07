import React, { useState, useEffect } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct, fetchOrders, updateOrderStatus } from '../services/api';

export default function AdminDashboard({ user, onLogout }) {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', category: 'New Arrivals', price: '', description: '', image: '' });
  
  // Edit State Management
  const [editingProductId, setEditingProductId] = useState(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Active Tab State ('inventory' or 'orders')
  const [activeTab, setActiveTab] = useState('inventory');

  // Real Orders State
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Modals States
  const [viewingProduct, setViewingProduct] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const loadOrders = async () => {
    setOrdersLoading(true);
    try {
      const response = await fetchOrders();
      const apiOrders = response?.data || [];
      
      if (apiOrders.length > 0) {
        setOrders(apiOrders);
      } else {
        const localOrders = JSON.parse(localStorage.getItem('luxecart_orders') || '[]');
        setOrders(localOrders);
      }
    } catch (err) {
      console.error('Error fetching orders, falling back to local storage:', err);
      const localOrders = JSON.parse(localStorage.getItem('luxecart_orders') || '[]');
      setOrders(localOrders);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✏️ Edit Button Click Handler
  const handleEditClick = (product) => {
    setEditingProductId(product.id || product._id);
    setFormData({
      name: product.name || '',
      category: product.category || 'New Arrivals',
      price: product.price || '',
      description: product.description || '',
      image: product.image || ''
    });
    setError('');
    setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ❌ Cancel Edit Mode
  const handleCancelEdit = () => {
    setEditingProductId(null);
    setFormData({ name: '', category: 'New Arrivals', price: '', description: '', image: '' });
  };

  // Form Submit Handler ( Handles both Add & Edit with Backend API Sync )
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (editingProductId) {
        // 1. Backend database par update request bhejo
        await updateProduct(editingProductId, formData);

        // 2. Success message aur state reset karo
        setSuccess(`Product #${editingProductId} updated successfully in database!`);
        setEditingProductId(null);
      } else {
        // Add new product logic
        await addProduct(formData);
        setSuccess('Product published successfully!');
      }

      setFormData({ name: '', category: 'New Arrivals', price: '', description: '', image: '' });
      loadProducts(); // Database se fresh data foran load karo taake refresh par bhi rahe
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        loadProducts();
        if (editingProductId === id) handleCancelEdit();
      } catch (err) {
        setProducts(products.filter(p => (p.id || p._id) !== id));
      }
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, { status: newStatus });
      loadOrders();
    } catch (err) {
      console.error('API status update failed', err);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategoryFilter === 'All' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalProductsCount = products.length;
  const totalInventoryValue = products.reduce((acc, curr) => acc + Number(curr.price || 0), 0).toFixed(2);
  const totalOrdersCount = orders.length;

  return (
    <div className="min-h-screen bg-[#F4F1EA] p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="bg-white rounded-2xl p-6 border border-amber-200/60 shadow-sm flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-md text-[10px] font-bold uppercase tracking-wider">Store Admin</span>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">● Live Sync Active</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#2D2A26] mt-1">Merchant Control Center</h1>
            <p className="text-xs text-gray-500">Welcome back, {user?.name || 'Tayyaba Batool'}. Manage your live inventory and customer orders.</p>
          </div>
          <button 
            onClick={onLogout}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition cursor-pointer border border-red-100"
          >
            Logout Session
          </button>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-amber-200/60 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Total Products</p>
              <h4 className="text-xl font-bold text-[#2D2A26] mt-0.5">{totalProductsCount} Items</h4>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">📦</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200/60 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Customer Orders</p>
              <h4 className="text-xl font-bold text-amber-800 mt-0.5">{totalOrdersCount} Orders</h4>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">🛍️</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200/60 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Inventory Value</p>
              <h4 className="text-xl font-bold text-[#2D2A26] mt-0.5">${totalInventoryValue}</h4>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">💰</div>
          </div>
        </div>

        {/* Tab Navigation Switcher */}
        <div className="flex gap-2 border-b border-amber-200 pb-2">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'inventory' ? 'bg-[#2D2A26] text-[#F5E6C8]' : 'bg-white text-gray-600 border border-amber-200'}`}
          >
            📦 Inventory Catalog ({products.length})
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'orders' ? 'bg-[#2D2A26] text-[#F5E6C8]' : 'bg-white text-gray-600 border border-amber-200'}`}
          >
            🛍️ Customer Orders ({orders.length})
          </button>
        </div>

        {error && <div className="bg-red-50 text-red-600 text-xs p-4 rounded-xl border border-red-200">{error}</div>}
        {success && <div className="bg-emerald-50 text-emerald-700 text-xs p-4 rounded-xl border border-emerald-200 font-medium">{success}</div>}

        {/* TAB 1: INVENTORY MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`bg-white p-6 rounded-2xl border ${editingProductId ? 'border-amber-500 ring-2 ring-amber-200' : 'border-amber-200/60'} shadow-sm lg:col-span-1 h-fit transition-all`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-[#2D2A26] flex items-center gap-2">
                  {editingProductId ? `✏️ Edit Product (#${editingProductId})` : '➕ Add New Product'}
                </h3>
                {editingProductId && (
                  <button 
                    onClick={handleCancelEdit}
                    className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-bold hover:bg-gray-200 cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Product Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="e.g., Luxury Silk Scarf" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-[#FAF8F5] focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Store Category</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-[#FAF8F5] focus:outline-none focus:border-amber-600"
                  >
                    <option value="New Arrivals">New Arrivals</option>
                    <option value="Our Best Sellers">Our Best Sellers</option>
                    <option value="Trending Collections">Trending Collections</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    name="price" 
                    placeholder="0.00" 
                    value={formData.price} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-[#FAF8F5] focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Image URL</label>
                  <input 
                    type="text" 
                    name="image" 
                    placeholder="https://images.unsplash.com/..." 
                    value={formData.image} 
                    onChange={handleInputChange} 
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-[#FAF8F5] focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Short Description</label>
                  <textarea 
                    name="description" 
                    placeholder="Brief description..." 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    rows="3"
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-[#FAF8F5] focus:outline-none focus:border-amber-600 resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition cursor-pointer shadow-sm disabled:opacity-50 ${
                    editingProductId ? 'bg-amber-800 text-white hover:bg-amber-900' : 'bg-[#2D2A26] text-[#F5E6C8] hover:bg-black'
                  }`}
                >
                  {loading ? 'Processing...' : editingProductId ? 'Save Product Changes' : 'Publish to Storefront'}
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-200/60 shadow-sm lg:col-span-2 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-sm font-bold text-[#2D2A26]">📦 Manage Inventory Catalog ({filteredProducts.length})</h3>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-1.5 border rounded-xl text-xs bg-[#FAF8F5] focus:outline-none focus:border-amber-600 w-full sm:w-40"
                  />
                  <select 
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="px-3 py-1.5 border rounded-xl text-xs bg-[#FAF8F5] focus:outline-none focus:border-amber-600"
                  >
                    <option value="All">All Categories</option>
                    <option value="New Arrivals">New Arrivals</option>
                    <option value="Our Best Sellers">Our Best Sellers</option>
                    <option value="Trending Collections">Trending Collections</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b text-gray-600">
                      <th className="p-3 font-semibold">Product Info</th>
                      <th className="p-3 font-semibold">Category</th>
                      <th className="p-3 font-semibold">Price</th>
                      <th className="p-3 font-semibold">Description</th>
                      <th className="p-3 font-semibold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-10 text-gray-400">No products found.</td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => {
                        const productId = p.id || p._id;
                        return (
                          <tr key={productId} className={`hover:bg-amber-50/30 transition ${editingProductId === productId ? 'bg-amber-50/60' : ''}`}>
                            <td className="p-3 flex items-center gap-3">
                              {p.image ? (
                                <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg border border-gray-200 flex-shrink-0" />
                              ) : (
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-[10px]">No Img</div>
                              )}
                              <div>
                                <p className="font-bold text-[#2D2A26]">{p.name}</p>
                                <span className="text-[10px] text-gray-400">ID: #{productId}</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="px-2 py-1 bg-amber-50 text-amber-900 rounded-md text-[10px] font-semibold border border-amber-200/50">
                                {p.category || 'General'}
                              </span>
                            </td>
                            <td className="p-3 text-amber-800 font-bold">${p.price}</td>
                            <td className="p-3 text-gray-500 max-w-[150px] truncate">{p.description || 'No description'}</td>
                            <td className="p-3 text-center space-x-1.5">
                              <button 
                                onClick={() => setViewingProduct(p)}
                                className="px-2 py-1 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 font-medium transition cursor-pointer border border-amber-200"
                              >
                                View
                              </button>
                              <button 
                                onClick={() => handleEditClick(p)}
                                className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium transition cursor-pointer border border-blue-100"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDelete(productId)}
                                className="px-2 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition cursor-pointer border border-red-100"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOMER ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 rounded-2xl border border-amber-200/60 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-[#2D2A26]">🛍️ Customer Orders Received ({orders.length})</h3>
              <button 
                onClick={loadOrders}
                disabled={ordersLoading}
                className="px-3 py-1 bg-amber-50 text-amber-800 rounded-lg text-xs font-semibold hover:bg-amber-100 transition cursor-pointer border border-amber-200 flex items-center gap-1.5"
              >
                <span>{ordersLoading ? 'Syncing...' : '🔄 Refresh Orders'}</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b text-gray-600">
                    <th className="p-3 font-semibold">Order ID</th>
                    <th className="p-3 font-semibold">Customer & Shipping Info</th>
                    <th className="p-3 font-semibold">Ordered Items</th>
                    <th className="p-3 font-semibold">Total Amount</th>
                    <th className="p-3 font-semibold">Status</th>
                    <th className="p-3 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-gray-400">No customer orders found in the database yet.</td>
                    </tr>
                  ) : (
                    orders.map((order) => {
                      const orderId = order.id || order._id;
                      return (
                        <tr key={orderId} className="hover:bg-amber-50/30 transition align-top">
                          <td className="p-3">
                            <p className="font-bold text-amber-800">#{orderId}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{order.date || 'Recent'}</p>
                          </td>
                          
                          <td className="p-3 space-y-0.5">
                            <p className="font-bold text-[#2D2A26]">{order.customer || order.customerName || 'Guest User'}</p>
                            <p className="text-[10px] text-gray-500">📧 {order.email || 'N/A'}</p>
                            <p className="text-[10px] text-gray-500">📞 {order.phone || order.phoneNumber || 'N/A'}</p>
                            <p className="text-[10px] font-semibold text-amber-900 mt-1">📍 {order.address || order.shippingAddress || 'No Address Provided'}</p>
                            <p className="text-[10px] text-gray-500">🏙️ City: <span className="font-medium text-gray-700">{order.city || 'N/A'}</span></p>
                            <p className="text-[10px] text-gray-500">💳 Payment: <span className="font-medium text-gray-700">{order.paymentMethod || 'Cash on Delivery (COD)'}</span></p>
                          </td>

                          <td className="p-3 text-gray-600 max-w-[180px]">
                            {Array.isArray(order.items) ? (
                              order.items.map((i, idx) => (
                                <div key={idx} className="text-[11px] truncate">
                                  • {i.name} <span className="text-gray-400">(x{i.quantity})</span>
                                </div>
                              ))
                            ) : (
                              <span>{typeof order.items === 'string' ? order.items : 'N/A'}</span>
                            )}
                          </td>

                          <td className="p-3 font-bold text-[#2D2A26]">${Number(order.total || order.totalAmount || 0).toFixed(2)}</td>
                          
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                              order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 
                              order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-900'
                            }`}>
                              {order.status || 'Pending'}
                            </span>
                          </td>

                          <td className="p-3 text-center space-y-2">
                            <select 
                              value={order.status || 'Pending'}
                              onChange={(e) => handleStatusChange(orderId, e.target.value)}
                              className="w-full px-2 py-1 border rounded-lg text-xs bg-[#FAF8F5] focus:outline-none cursor-pointer border-amber-200"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                            
                            <button 
                              onClick={() => setViewingOrder(order)}
                              className="w-full px-2 py-1 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 font-medium transition cursor-pointer border border-amber-200 text-[11px]"
                            >
                              🔍 Full Details
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Product View Modal */}
      {viewingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-amber-200 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-sm font-bold text-[#2D2A26]">🔍 Product Details</h3>
              <button onClick={() => setViewingProduct(null)} className="text-gray-400 hover:text-black font-bold text-sm cursor-pointer">✕</button>
            </div>
            <div className="space-y-3">
              {viewingProduct.image && (
                <img src={viewingProduct.image} alt={viewingProduct.name} className="w-full h-48 object-cover rounded-xl border border-gray-200" />
              )}
              <div>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-900 rounded-md text-[10px] font-semibold border border-amber-200/50">{viewingProduct.category}</span>
                <h2 className="text-lg font-serif font-bold text-[#2D2A26] mt-1">{viewingProduct.name}</h2>
                <p className="text-amber-800 font-bold text-base mt-0.5">${viewingProduct.price}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <p className="text-[11px] font-semibold text-gray-500 uppercase">Description</p>
                <p className="text-xs text-gray-700 mt-1">{viewingProduct.description || 'No description available.'}</p>
              </div>
            </div>
            <button onClick={() => setViewingProduct(null)} className="w-full py-2.5 bg-[#2D2A26] text-[#F5E6C8] rounded-xl text-xs font-bold hover:bg-black transition cursor-pointer">Close Window</button>
          </div>
        </div>
      )}

      {/* Order Full Details Popup Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-amber-200 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded text-[10px] font-bold">Order Verification</span>
                <h3 className="text-base font-serif font-bold text-[#2D2A26] mt-1">Order Summary #{viewingOrder.id || viewingOrder._id}</h3>
              </div>
              <button onClick={() => setViewingOrder(null)} className="text-gray-400 hover:text-black font-bold text-sm cursor-pointer">✕</button>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-amber-200/50 space-y-1.5">
                <p className="font-bold text-gray-700 uppercase text-[10px] tracking-wider mb-1">Customer & Delivery Info</p>
                <p><strong className="text-gray-500">Name:</strong> {viewingOrder.customer || viewingOrder.customerName}</p>
                <p><strong className="text-gray-500">Email:</strong> {viewingOrder.email || 'N/A'}</p>
                <p><strong className="text-gray-500">Phone:</strong> {viewingOrder.phone || viewingOrder.phoneNumber || 'N/A'}</p>
                <p><strong className="text-gray-500">Shipping Address:</strong> {viewingOrder.address || viewingOrder.shippingAddress || 'N/A'}</p>
                <p><strong className="text-gray-500">City:</strong> {viewingOrder.city || 'N/A'}</p>
                <p><strong className="text-gray-500">Payment Method:</strong> {viewingOrder.paymentMethod || 'Cash on Delivery (COD)'}</p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2">
                <p className="font-bold text-gray-700 uppercase text-[10px] tracking-wider">Ordered Products</p>
                {Array.isArray(viewingOrder.items) ? (
                  viewingOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-1.5 last:border-0">
                      <div>
                        <p className="font-bold text-[#2D2A26]">{item.name}</p>
                        <p className="text-[10px] text-gray-400">Qty: {item.quantity} {item.price ? `| Unit Price: $${item.price}` : ''}</p>
                      </div>
                      <span className="font-bold text-amber-800">${(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">{String(viewingOrder.items)}</p>
                )}
              </div>

              <div className="flex justify-between items-center bg-amber-50/60 p-3 rounded-xl border border-amber-200 font-bold text-sm">
                <span>Total Amount:</span>
                <span className="text-amber-900">${Number(viewingOrder.total || viewingOrder.totalAmount || 0).toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => setViewingOrder(null)} 
              className="w-full py-2.5 bg-[#2D2A26] text-[#F5E6C8] rounded-xl text-xs font-bold hover:bg-black transition cursor-pointer"
            >
              Close Summary
            </button>
          </div>
        </div>
      )}
    </div>
  );
}