import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ChainsCarousel.css';

const ChainsCarousel = () => {
    const [chains, setChains] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchChainsData();
    }, []);

    const fetchChainsData = async () => {
        try {
            const response = await fetch('https://localhost:7036/Store/Chains');
            const data = await response.json();
            setChains(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching chain data:', error);
            setLoading(false);
        }
    };

    const convertImgurLink = (link) => {
        if (!link) return '';
        const imgurId = link.split('/').pop();
        return `https://i.imgur.com/${imgurId}.jpg`;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const scrollToCategories = () => {
        const categories = document.getElementById('categories');
        categories.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Carousel>
            {chains.map((chain, index) => (
                <Carousel.Item key={index} className="carousel-item">
                    <img
                        className="d-block w-100"
                        src={convertImgurLink(chain.chainImage)}
                        alt={chain.chainName}
                    />
                    <Carousel.Caption>
                        <h3>{chain.chainName}</h3>
                        <p>{chain.description}</p>
                        <button
                            type="button"
                            className="btn btn-outline-light mt-5"
                            onClick={scrollToCategories}
                        >
                            Категории товаров
                        </button>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ChainsCarousel;