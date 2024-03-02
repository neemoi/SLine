import React from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx';
import MainPage from './pages/Main/MainPage.jsx'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <MainPage />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
