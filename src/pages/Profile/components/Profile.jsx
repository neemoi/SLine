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
        
        if (
            formData.email !== profileData.email ||
            formData.userName !== profileData.userName ||
            formData.phoneNumber !== profileData.phoneNumber ||
            formData.address !== profileData.address ||
            formData.newPassword !== ''
        ) {
            if (formData.currentPassword.trim() === '') {
                setError('Для изменения данных профиля введите текущий пароль');
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
            <hr className='mt-1' />

            {error && <div className="alert alert-danger">{error}</div>}

            <form className='mt-4' onSubmit={handleSubmit}>
                <div className="form-block">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="email"></label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber"></label>
                            <input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Телефон"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="currentPassword"></label>
                            <input
                                type="password"
                                name="currentPassword"
                                id="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Текущий пароль"
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="userName"></label>
                            <input
                                type="text"
                                name="userName"
                                id="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Имя пользователя"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address"></label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Адрес"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword"></label>
                            <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Новый пароль"
                            />
                        </div>
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