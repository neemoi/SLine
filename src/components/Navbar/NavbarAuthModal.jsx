import React, { useState } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import { BoxArrowInRight } from 'react-bootstrap-icons';
import './styles/NavbarAuthModal.css';

function AuthModal() {
    const [show, setShow] = useState(false);
    const [activeTab, setActiveTab] = useState('login');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUserName, setRegisterUserName] = useState('');
    const [registerPhoneNumber, setRegisterPhoneNumber] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:7036/Authorization/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword
                })
            });

            if (!response.ok) {
                const data = await response.json();
                if (data.message === `Email ${loginEmail} not found`) {
                    setError('Пользователь с таким email не найден.');
                } else if (data.message === 'Invalid password') {
                    setError('Неверный пароль.');
                } else {
                    setError('Произошла ошибка при попытке входа. Пожалуйста, попробуйте еще раз.');
                }
                return;
            }

            const data = await response.json();
            document.cookie = `token=${data.token}; path=/`;
            localStorage.setItem('user', JSON.stringify(data));
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            setError('Произошла ошибка при попытке входа. Пожалуйста, попробуйте еще раз.');
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {

            if (registerUserName.length < 3 || registerUserName.length > 20) {
                setError('Имя пользователя должно содержать от 3 до 20 символов.');
                return;
            }

            const isValidPhoneNumber = (phoneNumber) => {
                const phoneRegex = /^\+375\d{9}$/;
                return phoneRegex.test(phoneNumber);
            };

            if (!isValidPhoneNumber(registerPhoneNumber)) {
                setError('Пожалуйста, введите корректный номер телефона в формате +375-XX-XXX-XX-XX.');
                return;
            }

            const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{5,})/;
            if (!passwordRegex.test(registerPassword)) {
                setError('Пароль должен содержать не менее 5 символов, включая как минимум одну заглавную букву, одну цифру и один специальный символ.');
                return;
            }

            if (registerPassword !== confirmPassword) {
                setError('Пароль и его подтверждение не совпадают.');
                return;
            }

            const response = await fetch('https://localhost:7036/Authorization/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: registerUserName,
                    phoneNumber: registerPhoneNumber,
                    email: registerEmail,
                    password: registerPassword,
                    confirmPassword: confirmPassword
                })
            });

            if (!response.ok) {
                const data = await response.json();
                if (data.message.includes('User with this')) {
                    setError('Пользователь с таким email уже существует.');
                } else {
                    setError('Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.');
                }
                return;
            }

            const data = await response.json();
            document.cookie = `token=${data.token}; path=/`;
            localStorage.setItem('user', JSON.stringify(data));
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            setError('Произошла ошибка при попытке регистрации. Пожалуйста, попробуйте еще раз.');
        }
    };

    return (
        <>
            <BoxArrowInRight variant="primary" onClick={handleShow} id="authButton" className="auth-modal-button">
                Открыть модальное окно
            </BoxArrowInRight>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                    <Tabs
                        id="authTabs"
                        activeKey={activeTab}
                        onSelect={(tab) => handleTabChange(tab)}
                        className="justify-content-center"
                    >
                        <Tab eventKey="login" title="Вход">
                            <form className="mt-4 text-center" onSubmit={handleLoginSubmit}>
                                <div className="mb-3 text-start"></div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Пароль"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-outline-primary">
                                    Войти
                                </button>
                                {error && <p className="text-danger mt-3">{error}</p>}
                            </form>
                        </Tab>
                        <Tab eventKey="register" title="Регистрация">
                            <form className="mt-4 text-center" onSubmit={handleRegisterSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Имя"
                                        value={registerUserName}
                                        onChange={(e) => setRegisterUserName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Номер телефона"
                                        value={registerPhoneNumber}
                                        onChange={(e) => setRegisterPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={registerEmail}
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Пароль"
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Подтвердите пароль"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-outline-primary mt-3">
                                    Зарегистрироваться
                                </button>
                                {error && <p className="text-danger mt-4">{error}</p>}
                            </form>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AuthModal;