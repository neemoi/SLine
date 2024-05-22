import React, { useState, useEffect } from 'react';
import '../styles/StoresPage.css';

const Stores = () => {
    const [stores, setStores] = useState([]);
    const [chains, setChains] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStoresData();
    }, []);

    const fetchStoresData = async () => {
        try {
            const storesResponse = await fetch('https://localhost:7036/Store/AllStores');
            const storesData = await storesResponse.json();

            const chainsResponse = await fetch('https://localhost:7036/Store/Chains');
            const chainsData = await chainsResponse.json();

            setStores(storesData);
            setChains(chainsData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching store data:', error);
            setLoading(false);
        }
    };

    const getChainDescription = (chainName) => {
        const chain = chains.find(c => c.chainName === chainName);
        return chain ? chain.description : 'Описание не найдено';
    };

    const formatImageName = (name) => {
        return name.toLowerCase().replace(/\s+/g, '_');
    };

    const openMaps = (city, address) => {
        const encodedCity = encodeURIComponent(city);
        const encodedAddress = encodeURIComponent(address);
        window.open(`https://yandex.ru/maps/?text=${encodedCity}%20${encodedAddress}`, '_blank');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const groupedStores = stores.reduce((acc, store) => {
        if (!acc[store.chain.chainName]) {
            acc[store.chain.chainName] = {
                chainName: store.chain.chainName,
                description: getChainDescription(store.chain.chainName),
                stores: []
            };
        }
        acc[store.chain.chainName].stores.push(store);
        return acc;
    }, {});

    return (
        <div className="container stores-page-container mt-5">
            <h1 className="stores-page-title">Наши магазины</h1>
            {Object.keys(groupedStores).map(chainName => (
                <div key={chainName} className="chain-card mt-5">
                    <div className="chain-details">
                        <h2 className="chain-name mt-4">{chainName}</h2>
                        <p className="chain-description mt-2">{groupedStores[chainName].description}</p>
                        <h3 className="chain-stores-title mt-4">Адреса магазинов:</h3>
                        <div className="chain-stores-list mt-2">
                            {groupedStores[chainName].stores.map(store => (
                                <div 
                                    key={store.address} 
                                    className="chain-store-item"
                                    onClick={() => openMaps(store.city, store.address)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <p><strong>{store.city}</strong></p>
                                    <p>{store.address}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Stores;