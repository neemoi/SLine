import React, { useState, useEffect } from 'react';
import YandexMapModal from './YandexMapModal';
import '../styles/Profile.css';

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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const checkAuth = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user && user.token;
    };

    const fetchProfileData = async () => {
        try {
            const isAuthenticated = checkAuth();
            if (!isAuthenticated) {
                setError('Авторизуйтесь для просмотр заказов');
                return;
            }

            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user.id;

            const response = await fetch(`https://localhost:7036/Profile/GetAllInfo?userId=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

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

        const errors = []; 

        for (const key in formData) {
            if (formData[key].trim() === '') {
                errors.push(`Поле ${key} не может быть пустым`);
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
                errors.push('Для изменения данных профиля введите текущий пароль');
            }
        }

        if (errors.length > 0) {
            setError(errors.join('; ')); 
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id) {
                const userId = user.id;

                const response = await fetch(`https://localhost:7036/Profile/Edit?userId=${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container mt-5">
            <h1>Профиль</h1>
            <hr className='mt-1' />

            {error && (
                <>
                    {error.includes('Авторизуйтесь для просмотр заказов') ? (
                        <div className='alert-auth'>
                            {error}
                        </div>
                    ) : (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                </>
            )}

            {profileData ? (
                <form className='mt-5' onSubmit={handleSubmit}>
                    <div className="form-block">
                        <div className="form-row">
                            <div className="form-group">
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
                            <div>
                                <button
                                    onClick={openModal}
                                    className="btn btn-outline-secondary mt-4"
                                >
                                    Указать адрес на карте
                                </button>
                            </div>
                            <button type="submit" className="btn btn-primary mt-2">
                                Обновить данные
                            </button>
                        </div>
                    </div>
                    <div className='profileAuth-bottom'></div>
                </form>
            ) : (
                <div className='profile-bottom'></div>
            )}

            <YandexMapModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
            />
        </div>
    );
}

export default UserProfile;