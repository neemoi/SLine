import React from 'react';
import BackgroundImq from './components/BackgroundImq.jsx'
import Categories from './components/Categories.jsx'
import InformationProduct from './components/InformationProduct.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

function Main() {
    return (
        <div className='main-page'>
            <BackgroundImq />
            <Categories />
            <InformationProduct />
        </div>
    );
}

export default Main;
