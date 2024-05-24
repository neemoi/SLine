import React, { useState, useEffect } from 'react';
import YandexMapModal from '../ModalMap/YandexMapModal';
import '../../styles/Profile.css';
import ProfileForm from './ProfileForm';
import Notification from '../Profile/Notification';

function UserProfile() {
    const [profileData, setProfileData] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [formData, setFormData] = useState({
        email: '',
        userName: '',
        phoneNumber: '',
        address: '',
        currentPassword: '',
        newPassword: '',
        birthDate: '',
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
                setNotification({ message: 'Авторизуйтесь для просмотра профиля'});
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
                    birthDate: data.birthDate || '',
                });
            } else {
                throw new Error(`Ошибка запроса: ${response.status}`);
            }
        } catch (error) {
            setNotification({ message: `Прозошла ошибка при загрузке профиля`});
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

    const validateFields = () => {
        const { currentPassword, newPassword, phoneNumber, email } = formData;
        let isValid = true;
        if (currentPassword !== newPassword) {
            setNotification({ message: 'Пароли не совпадают', type: 'warning' });
            isValid = false;
        }
        if (!/^\+375\d{9}$/.test(phoneNumber)) {
            setNotification({ message: 'Неверный формат номера телефона (+375-00-000-00-00)', type: 'error' });
            isValid = false;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setNotification({ message: 'Неверный формат адреса электронной почты', type: 'error' });
            isValid = false;
        }
        if (newPassword && newPassword.length < 6) {
            setNotification({ message: 'Минимальная длина пароля - 6 символов', type: 'warning' });
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
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
                    setNotification({ message: 'Профиль успешно обновлен', type: 'success' });
                } else {
                    if (response.status === 400) {
                        const errorData = await response.json();
                        if (errorData.errors && errorData.errors.CurrentPassword) {
                            setNotification({ message: 'Введенный текущий пароль неверен' });
                        } else {
                            setNotification({ message: `Ошибка при обновлении профиля`});
                        }
                    } else {
                        setNotification({ message: `Ошибка при обновлении профиля` });
                    }
                }
            } else {
                setNotification({ message: 'Не удалось найти пользователя'});
            }
        } catch (error) {
            setNotification({ message: `Ошибка при отправке запроса` });
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
            <h1 className="profile-title">Профиль</h1>
            <hr className='profile-divider' />

            {notification.message && (
                <Notification 
                    message={notification.message}
                    type={notification.type}
                    clearNotification={() => setNotification({ message: '', type: '' })}
                />
            )}

            {profileData ? (
                <ProfileForm
                    formData={formData}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    openModal={openModal}
                />
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