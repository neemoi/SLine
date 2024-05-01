import React, { useState, useEffect } from 'react';
import '../styles/UserProfile.css';

function UserProfile() {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        userName: '',
        phoneNumber: '',
        address: '',
        currentPassword: '',
        newPassword: '',
    });

    const fetchProfileData = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id) {
                const userId = user.id;
                
                const response = await fetch(`https://localhost:7036/Profile/GetAllInfo?userId=${userId}`);
                
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                    setFormData({
                        email: data.email,
                        userName: data.userName,
                        phoneNumber: data.phoneNumber,
                        address: data.address,
                        currentPassword: '',
                        newPassword: '',
                    });
                } else {
                    throw new Error(`Ошибка запроса: ${response.status}`);
                }
            } else {
                setError('Не удалось найти пользователя в локальном хранилище');
            }
        } catch (error) {
            setError(`Ошибка: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        for (let key in formData) {
            if (formData[key].trim() === '') {
                setError(`Поле ${key} не может быть пустым`);
                return;
            }
        }
    
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id) {
                const userId = user.id;
    
                const response = await fetch(`https://localhost:7036/Profile/Edit?userId=${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                    setError('Профиль успешно обновлен');
                } else {
                    const errorData = await response.json();
                    setError(`Ошибка при обновлении профиля: ${errorData.message}`);
                }
            } else {
                setError('Не удалось найти пользователя');
            }
        } catch (error) {
            setError(`Ошибка при отправке запроса: ${error.message}`);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Профиль</h1>
            <hr className='mt-1'></hr>
            {error && <div className="alert alert-danger">{error}</div>}
            <form className='mt-4' onSubmit={handleSubmit}>
                <div className="form-block">
                    <div className="form-row">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Телефон"
                        />
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Текущий пароль"
                        />
                    </div>
                    <div className="form-row">
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Имя пользователя"
                        />
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Адрес"
                        />
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Новый пароль"
                        />
                    </div>
                    <div className="form-button">
                        <button type="submit" className="btn btn-primary">Обновить данные</button>
                    </div>
                </div>
            </form>
            <div className='profile-top'></div>
        </div>
    );
}

export default UserProfile;