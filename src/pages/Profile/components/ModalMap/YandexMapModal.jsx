import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { YMaps, Map, Placemark, SearchControl, GeolocationControl } from '@pbe/react-yandex-maps';
import '../../styles/YandexMapModal.css';

function YandexMapModal({ isOpen, onRequestClose, onOpenStoresModal, onAddressSaved, setMapModalOpen }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    const [mapCenter, setMapCenter] = useState([55.753994, 37.622093]);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');

    const setCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const coords = [latitude, longitude];
                    
                    setMapCenter(coords);
                    setMarkerPosition(coords);
                    getAddress(coords);
                },
                (error) => {
                    console.log('Error getting the current location:', error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        } else {
            console.log('Geolocation API is not supported in this browser');
        }
    };

    useEffect(() => {
        setCurrentLocation();
    }, []);

    const handleMapClick = async (e) => {
        const coords = e.get('coords');
        setMarkerPosition(coords);
        await getAddress(coords);
    };

    const getAddress = async (coords) => {
        try {
            const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=05ecec97-8672-45d1-b90c-53f0d9cb61d5&geocode=${coords[1]},${coords[0]}`);
            const data = await response.json();
            const geoObject = data.response.GeoObjectCollection.featureMember[0].GeoObject;
            const fullAddress = geoObject.metaDataProperty.GeocoderMetaData.Address.formatted;

            const addressParts = fullAddress.split(', ');
            const extractedCity = extractCity(fullAddress);
            setCity(extractedCity);

            const trimmedAddress = addressParts.slice(1).join(', ');

            setAddress(trimmedAddress);
        } catch (error) {
            console.log('Geocoding error:', error);
        }
    };

    const extractCity = (address) => {
        const parts = address.split(', ');

        for (let part of parts) {
            if (part.toLowerCase().includes('обл')) {
                continue;
            }
            return part;
        }
        return ''; 
    };

    const handleSave = async () => {
        if (userId) {
            try {
                const response = await fetch(`https://localhost:7036/Profile/SetAddres?userId=${userId}&address=${encodeURIComponent(address)}`, {
                    method: 'PUT',
                });
    
                if (response.ok) {
                    const userData = { ...user, address, city };
                    localStorage.setItem('user', JSON.stringify(userData));
                    onAddressSaved();
    
                    setMapModalOpen(false);
    
                    await onOpenStoresModal();
                } else {
                    console.log('Error saving the address on the server:', response.statusText);
                }
            } catch (error) {
                console.log('Error saving the address on the server:', error);
            }
        } else {
            console.log('Error: missing userId');
        }
    
        onRequestClose();
    };

    return (
        <Modal show={isOpen} onHide={onRequestClose} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className="modal-address">
                        Укажите ваш адрес
                    </div>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="input-group mt-2">
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Адрес"
                        className="form-control"
                        style={{ width: '60%' }} 
                    />
                    <button type="button" className="btn btn-outline-secondary" onClick={handleSave}>
                        Подтвердить
                    </button>
                </div>
                <div className="yandex-map-modal-container">
                    <YMaps query={{ apikey: '05ecec97-8672-45d1-b90c-53f0d9cb61d5', lang: 'ru_RU' }}>
                        <Map state={{ center: mapCenter, zoom: 15 }} style={{ height: '100%', width: '100%' }} onClick={handleMapClick}>
                            {markerPosition && (
                                <Placemark
                                    geometry={markerPosition}
                                    properties={{ balloonContent: address }}
                                    options={{ draggable: true }}
                                    onDragEnd={(e) => {
                                        const coords = e.get('target').geometry.getCoordinates();
                                        setMarkerPosition(coords);
                                        getAddress(coords);
                                    }}
                                />
                            )}
                            <SearchControl options={{ float: 'right' }} />
                            <GeolocationControl options={{ float: 'left' }} />
                        </Map>
                    </YMaps>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default YandexMapModal;