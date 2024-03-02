import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/BackgroundImq.css'

function scrollToCategories() {
    const categories = document.getElementById('all-categories');
    categories.scrollIntoView({ behavior: 'smooth' });
}

const BgImg = () => {
    return (
        <div className="bg-img">
            <div className="container text-center">
                <h1>Описание</h1>
                <div className="container mt-5">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae necessitatibus temporibus consequatur aliquid odio fugiat, eos ipsam commodi, voluptatibus doloremque, cumque voluptate debitis. Dolorem quae illum suscipit fuga odit cum.</p>
                </div>
                <button type="button" className="btn btn-outline-light mt-5" onClick={scrollToCategories}>Категории товаров</button>
            </div>
        </div>
    );
};

export default BgImg;