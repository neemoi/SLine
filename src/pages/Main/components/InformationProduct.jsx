import React from 'react';
import Delivery from '../../../img/Delivery.jpg';
import Welcome from '../../../img/Welcome.jpg';
import Chose from '../../../img/Chose.jpg';
import '../styles/InformationProduct.css';

function ExampleComponent() {
    return (
        <>
            <div className="container mt-5">
                <hr className="container mt-5" />
                <div className="row mt-5">
                    <h1 className='text-center'>Добро пожаловать!</h1>
                    <div className="col-md-6 mb-4 mt-5">
                        <img src={Welcome} alt="Fresh Groceries" className="img-fluid" />
                    </div>
                    <div className="col-md-6 mb-4 mt-5" style={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                        <p>Здесь вы найдете широкий ассортимент свежих продуктов, от фермерских овощей и фруктов до лучших мясных и молочных продуктов. Наши товары всегда свежие и качественные, чтобы вы могли наслаждаться вкусной и полезной едой каждый день.</p>
                    </div>
                </div>
                <hr className="container mt-5" />
            </div>
            <div className="container mt-5">
                <div className="row">
                    <h1 className='text-center'>Удобная доставка</h1>
                    <div className="col-md-6 mb-4 mt-5" style={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                        <p>Мы предлагаем быструю и удобную доставку на дом. Просто выберите необходимые товары, оформите заказ, и наш курьер доставит его прямо к вашей двери. Мы ценим ваше время и заботимся о вашем комфорте.</p>
                    </div>
                    <div className="col-md-6 mb-4 mt-5">
                        <img src={Delivery} alt="Delivery Service" className="img-fluid" />
                    </div>
                </div>
                <div className="container mt-5">
                    <hr className="container mt-5" />
                    <div className="why-choose-us mt-5">
                        <img src={Chose} alt="Why Choose Us" className="img-fluid" />
                        <div className="overlay">
                            <h2>Почему выбирают нас?</h2>
                            <ul className='mt-5'>
                                <li className='mt-2'>Широкий ассортимент продуктов.</li>
                                <li className='mt-2'>Свежие и качественные товары.</li>
                                <li className='mt-2'>Удобная и быстрая доставка.</li>
                                <li className='mt-2'>Простота оформления заказа.</li>
                                <li className='mt-2'>Отличное обслуживание клиентов.</li>
                                <li className='mt-2'>И еще много маленьких приятностей)</li>
                            </ul>
                        </div>
                    </div>
                    <hr className="container mt-5" />
                </div>
            </div>
        </>
    );
}

export default ExampleComponent;