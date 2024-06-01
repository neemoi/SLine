import React from 'react';
import Categories from './components/Categories.jsx';
import InformationProduct from './components/InformationProduct.jsx';
import StoresCarousel from './components/StoresCarousel.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function Main() {
    return (
        <div className='main-page'>
            <StoresCarousel />
            <Categories />
            <InformationProduct />
        </div>
    );
}

export default Main;