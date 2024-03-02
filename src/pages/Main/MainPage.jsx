import React from 'react';
import BackgroundImq from './components/BackgroundImq.jsx'
import Categories from './components/Categories.jsx'
import InformationProduct from './components/InformationProduct.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

function MainPage() {
    return (
        <>
            <BackgroundImq />
            <Categories />
            <InformationProduct />
        </>
    );
}

export default MainPage;
