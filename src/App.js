import React from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Main from './pages/Main/Main.jsx';
import Subcategories from './pages/Subcategories/Subcategories.jsx';
import Products from './pages/Products/Products.jsx'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/subcategory/:categoryId" element={<Subcategories />} />
          <Route path="/products/:subcategoryId" element={<Products />} />
        </Routes> 
        <Footer />
      </div>
    </Router>
  );
}

export default App;
