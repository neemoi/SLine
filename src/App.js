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
import AdminPage from './pages/Administration/AdminPage.jsx'; 
import AdminCategory from './pages/Administration/components/Category/AdminCategory.jsx';
import AdminSubcategory from './pages/Administration/components/Subcategory/AdminSubcategory.jsx';
import AdminDelivery from './pages/Administration/components/Delivery/AdminDelivery.jsx';
import AdminProduct from './pages/Administration/components/Product/AdminProduct.jsx';
import WarehousePage from './pages/Administration/components/Warehouse/WarehousePage.jsx';
import StorePage from './pages/Administration/components/Store/StorePage.jsx';

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/category" element={<AdminCategory />} />
          <Route path="/admin/subcategory" element={<AdminSubcategory />} />
          <Route path="/admin/delivery" element={<AdminDelivery />} />
          <Route path="/admin/product" element={<AdminProduct />} />
          <Route path="/admin/warehouse" element={<WarehousePage />} />
          <Route path="/admin/store" element={<StorePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;