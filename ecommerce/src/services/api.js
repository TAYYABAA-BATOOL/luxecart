import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Hamara Node.js backend port 5000 par chal raha hai
});

// Jab bhi user login ho ga, token localStorage mein save ho ga. Yeh interceptor har request ke sath token khud ba khud bhej dega.
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// Auth APIs
export const loginUser = (formData) => API.post('/auth/login', formData);
export const signupUser = (formData) => API.post('/auth/signup', formData);

// Product APIs
export const fetchProducts = () => API.get('/products');
export const addProduct = (productData) => API.post('/products', productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);

// Order APIs
export const fetchOrders = () => API.get('/orders');
export const updateOrderStatus = (id, statusData) => API.put(`/orders/${id}`, statusData);

