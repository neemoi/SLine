import React from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Main from './pages/Main/Main.jsx';
import Subcategories from './pages/Subcategories/Subcategories.jsx';
import Products from './pages/Products/ProductsPage.jsx';
import ProductDetails from './pages/Products/components/ProductDetails/ProductDetails.jsx';
import AllProductsPage from './pages/Products/AllProductsPage.jsx';
import CategoriesPage from './pages/Products/CategoriesPage.jsx';
import BasketPage from './pages/Basket/BasketPage.jsx'; 
import OrderPage from './pages/Order/OrderPage.jsx'; 
import ProfilePage from './pages/Profile/ProfilePage.jsx'; 

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/subcategory/:categoryId" element={<Subcategories />} />
          <Route path="/products/:subcategoryId/:categoryId" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetails />} /> 
          <Route path="/allProducts" element={<AllProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
