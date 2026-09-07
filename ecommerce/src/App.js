import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import CategoryGrid from './components/CategoryGrid';
import TestimonialsSection from './components/TestimonialsSection';
import FAQsSection from './components/FAQsSection';
import PromoBanners from './components/PromoBanners';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal'; // <-- Naya imported checkout modal
import AuthModal from './components/AuthModal';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import WishlistDrawer from './components/WishlistDrawer';
import ProductCatalog from './components/ProductCatalog';
import { fetchProducts } from './services/api';

function App() {
  const [productsData, setProductsData] = useState([]); 
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const loadStoreProducts = async () => {
      try {
        const { data } = await fetchProducts();
        setProductsData(data); 
      } catch (err) {
        console.error('Failed to load store products:', err);
      } finally {
        setLoadingProducts(false);
      }
    };
    loadStoreProducts();
  }, []);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user') || localStorage.getItem('luxecart_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [toastMessage, setToastMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [maxPrice, setMaxPrice] = useState(300);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('luxecart_items');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('luxecart_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // <-- Checkout modal state

  useEffect(() => {
    localStorage.setItem('luxecart_items', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('luxecart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => { setToastMessage(null); }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('luxecart_user');
    setUser(null);
    showToast("You have been logged out.");
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const userData = { name: authForm.email.split('@')[0], email: authForm.email, role: 'user' };
    setUser(userData);
    localStorage.setItem('luxecart_user', JSON.stringify(userData));
    showToast(`Welcome, ${userData.name}!`);
    setIsAuthOpen(false);
    setAuthForm({ name: '', email: '', password: '' });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() !== '') {
      setSelectedProduct(null);
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'low-high') return a.price - b.price;
    if (sortBy === 'high-low') return b.price - a.price;
    if (sortBy === 'newest') return b.id - a.id;
    return 0;
  });

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id && item.size === product.size);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + product.quantity } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: product.quantity || 1, size: product.size || 'M' }];
    });
    setIsCartOpen(true);
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      return exists ? prev.filter(item => item.id !== product.id) : [...prev, product];
    });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Order Success Handler: Cart clear karega, notification dega aur Email trigger simulation chalayega
  const handleOrderSuccess = (order) => {
    setCart([]);
    localStorage.removeItem('luxecart_items');
    
    // Email simulation alert / notification for User and Admin
    console.log(`[Email Dispatch Simulation] Confirmation email sent to Customer (${order.email}) and Alert sent to Admin Dashboard.`);
    
    showToast(`Order #${order.id} placed successfully! Confirmation emails sent to user & admin.`);
  };

  if (!user) {
    return (
      <div className="min-h-screen relative">
        {toastMessage && <div className="fixed top-5 right-5 z-50 bg-[#2D2A26] text-[#F5E6C8] px-6 py-3 rounded-xl shadow-2xl">{toastMessage}</div>}
        <Login onLoginSuccess={(u) => { setUser(u); localStorage.setItem('user', JSON.stringify(u)); }} />
      </div>
    );
  }

  if (user.role === 'admin') {
    return (
      <div className="min-h-screen relative">
        <AdminDashboard user={user} onLogout={handleLogout} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5E6C8]/20 relative">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#2D2A26] text-[#F5E6C8] px-6 py-3 rounded-xl shadow-2xl border border-amber-300 text-sm font-medium animate-bounce z-50">
          {toastMessage}
        </div>
      )}

      <Navbar 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
        cartCount={totalCartCount} 
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)} 
        onWishlistClick={() => setIsWishlistOpen(true)}
        currentUser={user}
        onLoginClick={() => { setIsLoginMode(true); setIsAuthOpen(true); }}
        onLogoutClick={handleLogout}
      />
      
      <main className="flex-grow">
        {selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onAddToCart={addToCart} 
            onToggleWishlist={toggleWishlist}
            isWishlisted={wishlist.some(item => item.id === selectedProduct.id)}
            onBackToShop={() => setSelectedProduct(null)} 
          />
        ) : (
          <>
            <Hero />
            <CategoryGrid 
              onSelectCategory={(catName) => {
                setSelectedCategory(catName);
                setSelectedProduct(null);
                setSearchTerm('');
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }} 
            />

            <ProductCatalog 
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              filteredProducts={filteredProducts}
              productsData={productsData}
              wishlist={wishlist}
              onSelectProduct={setSelectedProduct}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
            />

            <TestimonialsSection />
            <PromoBanners onSelectCategory={(catName) => {
              setSelectedCategory(catName);
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }} />
            <FAQsSection />
          </>
        )}
      </main>

      {/* Wishlist Drawer */}
      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        onSelectProduct={setSelectedProduct}
      />

      {/* Cart Drawer with Proceed to Checkout trigger */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        totalPrice={totalPrice}
        increaseQuantity={(id, size) => setCart(cart.map(i => i.id === id && i.size === size ? {...i, quantity: i.quantity + 1} : i))}
        decreaseQuantity={(id, size) => setCart(cart.map(i => i.id === id && i.size === size ? {...i, quantity: i.quantity - 1} : i).filter(i => i.quantity > 0))}
        removeFromCart={(id, size) => setCart(cart.filter(i => !(i.id === id && i.size === size)))}
        onProceedToCheckout={() => setIsCheckoutOpen(true)} // <-- Yeh cart drawer band karke foran checkout form kholega
      />

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalPrice={totalPrice}
        onOrderSuccess={handleOrderSuccess}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        isLoginMode={isLoginMode}
        setIsLoginMode={setIsLoginMode}
        authForm={authForm}
        setAuthForm={setAuthForm}
        onAuthSubmit={handleAuthSubmit}
      />

      <Footer />
    </div>
  );
}

export default App;