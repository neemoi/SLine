import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { YMaps, Map, Placemark, SearchControl, GeolocationControl } from '@pbe/react-yandex-maps';
import '../styles/YandexMapModal.css';

function YandexMapModal({ isOpen, onRequestClose, onOpenStoresModal, onAddressSaved, setMapModalOpen }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    const [mapCenter, setMapCenter] = useState([55.753994, 37.622093]);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [address, setAddress] = useState('');

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
            const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=cfb230c3-80ff-4d9b-bad6-e6e5a19d86c4&geocode=${coords[1]},${coords[0]}`);
            const data = await response.json();
            const geoObject = data.response.GeoObjectCollection.featureMember[0].GeoObject;
            const fullAddress = geoObject.metaDataProperty.GeocoderMetaData.Address.formatted;

            const addressParts = fullAddress.split(', ');
            const trimmedAddress = addressParts.slice(1).join(', '); 
            
            setAddress(trimmedAddress);
        } catch (error) {
            console.log('Geocoding error:', error);
        }
    };

    const handleSave = async () => {
        if (userId) {
            try {
                const response = await fetch(`https://localhost:7036/Profile/SetAddres?userId=${userId}&address=${encodeURIComponent(address)}`, {
                    method: 'PUT',
                });

                if (response.ok) {
                    const userData = { ...user, address };
                    localStorage.setItem('user', JSON.stringify(userData));
                    onAddressSaved();

                    setMapModalOpen(false);
                    onOpenStoresModal();
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
          <Modal.Title>Укажите ваш адрес</Modal.Title>
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
                Подвердить
                </button>
            </div>
          <div className="yandex-map-modal-container">
            <YMaps query={{ apikey: 'cfb230c3-80ff-4d9b-bad6-e6e5a19d86c4', lang: 'ru_RU' }}>
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