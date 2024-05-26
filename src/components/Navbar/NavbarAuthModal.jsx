import React, { useState } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import { FaExclamationCircle } from 'react-icons/fa';
import './styles/NavbarAuthModal.css';

function AuthModal({ show, handleClose }) {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassword: '',
    registerUserName: '',
    registerPhoneNumber: '',
    registerEmail: '',
    registerPassword: '',
    confirmPassword: '',
    resetEmail: '',
    error: null,
  });

  const [formErrors, setFormErrors] = useState({});

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    const { loginEmail, loginPassword, registerUserName, registerPhoneNumber, registerEmail, registerPassword, confirmPassword, resetEmail } = formData;
  
    if (activeTab === 'login') {
      if (!loginEmail) errors.loginEmail = 'Поле Email обязательно';
      if (!loginPassword) errors.loginPassword = 'Поле Пароль обязательно';
    }
  
    if (activeTab === 'register') {
      if (!registerUserName) errors.registerUserName = 'Поле Имя обязательно';
      if (!registerPhoneNumber) errors.registerPhoneNumber = 'Поле Номер телефона обязательно';
      if (!registerEmail) errors.registerEmail = 'Поле Email обязательно';
      if (!registerPassword) errors.registerPassword = 'Поле Пароль обязательно';
      if (!confirmPassword) errors.confirmPassword = 'Поле Подтвердите пароль обязательно';
      if (registerPhoneNumber && !/^\+375\d{9}$/.test(registerPhoneNumber)) {
        errors.registerPhoneNumber = 'Неверный формат номера телефона (+375-00-000-00-00)';
      }
      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(registerPassword)) {
        errors.registerPassword = 'Пароль должен содержать как минимум одну цифру, одну строчную букву, одну заглавную букву и быть длиной не менее 6 символов';
      }
      if (registerPassword && confirmPassword && registerPassword !== confirmPassword) {
        errors.confirmPassword = 'Пароли не совпадают';
      }
    }
  
    if (activeTab === 'resetPassword') {
      if (!resetEmail) errors.resetEmail = 'Поле Email обязательно';
    }
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e, url, method, body) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        setFormData({ ...formData, error: data.message });
        return;
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data));
      handleClose();
      window.location.reload();
    } catch (error) {
      setFormData({
        ...formData,
        error: 'Произошла ошибка. Пожалуйста, попробуйте еще раз.',
      });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('https://localhost:7036/Authorization/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.resetEmail }),
      });

      if (!response.ok) {
        const data = await response.json();
        setFormData({ ...formData, error: data.message });
        return;
      }

      alert('Инструкция по сбросу пароля была отправлена на ваш email');
      handleClose();
    } catch (error) {
      setFormData({
        ...formData,
        error: 'Произошла ошибка. Пожалуйста, попробуйте еще раз.',
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <Tabs
          id="authTabs"
          activeKey={activeTab}
          onSelect={handleTabChange}
          className="justify-content-center"
        >
          <Tab eventKey="login" title="Вход">
            <form
              className="mt-4 text-center"
              onSubmit={(e) =>
                handleSubmit(e, 'https://localhost:7036/Authorization/Login', 'POST', {
                  email: formData.loginEmail,
                  password: formData.loginPassword,
                })
              }
            >
              <div className="mb-3 text-start position-relative">
                <input
                  type="email"
                  className={`form-control ${formErrors.loginEmail ? 'input-error' : ''}`}
                  placeholder="Email"
                  name="loginEmail"
                  value={formData.loginEmail}
                  onChange={handleChange}
                  />
                  {formErrors.loginEmail && <FaExclamationCircle className="input-error-icon"/>}
                <p className="text-center text-danger mt-1">{formErrors.loginEmail}</p>
              </div>
              <div className="mb-3 text-start position-relative">
                <input
                  type="password"
                  className={`form-control ${formErrors.loginPassword ? 'input-error' : ''}`}
                  placeholder="Пароль"
                  name="loginPassword"
                  value={formData.loginPassword}
                  onChange={handleChange}
                />
                {formErrors.loginPassword && <FaExclamationCircle className="input-error-icon" />}
                <p className="text-center text-danger mt-1">{formErrors.loginPassword}</p>
              </div>
              <button type="submit" className="btn btn-outline-warning">
                Войти
              </button>
              {formData.error && <p className="text-danger mt-3">{formData.error}</p>}
            </form>
          </Tab>
          <Tab eventKey="register" title="Регистрация">
            <form
              className="mt-4 text-center"
              onSubmit={(e) =>
                handleSubmit(
                  e,
                  'https://localhost:7036/Authorization/Register',
                  'POST',
                  {
                    userName: formData.registerUserName,
                    phoneNumber: formData.registerPhoneNumber,
                    email: formData.registerEmail,
                    password: formData.registerPassword,
                    confirmPassword: formData.confirmPassword,
                  }
                )
              }
            >
              <div className="mb-3 text-start position-relative">
                <input
                  type="text"
                  className={`form-control ${formErrors.registerUserName ? 'input-error' : ''}`}
                  placeholder="Имя"
                  name="registerUserName"
                  value={formData.registerUserName}
                  onChange={handleChange}
                />
                {formErrors.registerUserName && <FaExclamationCircle className="input-error-icon" />}
                {formErrors.registerUserName && <p className="text-center text-danger mt-1">{formErrors.registerUserName}</p>}
              </div>
              <div className="mb-3 text-start position-relative">
                <input
                  type="text"
                  className={`form-control ${formErrors.registerPhoneNumber ? 'input-error' : ''}`}
                  placeholder="Номер телефона"
                  name="registerPhoneNumber"
                  value={formData.registerPhoneNumber}
                  onChange={handleChange}
                />
                {formErrors.registerPhoneNumber && <FaExclamationCircle className="input-error-icon" />}
                {formErrors.registerPhoneNumber && <p className="text-center text-danger mt-1">{formErrors.registerPhoneNumber}</p>}
              </div>
              <div className="mb-3 text-start position-relative">
                <input
                  type="email"
                  className={`form-control ${formErrors.registerEmail ? 'input-error' : ''}`}
                  placeholder="Email"
                  name="registerEmail"
                  value={formData.registerEmail}
                  onChange={handleChange}
                />
                {formErrors.registerEmail && <FaExclamationCircle className="input-error-icon" />}
                {formErrors.registerEmail && <p className="text-center text-danger mt-1">{formErrors.registerEmail}</p>}
              </div>
              <div className="mb-3 text-start position-relative">
                <input
                  type="password"
                  className={`form-control ${formErrors.registerPassword ? 'input-error' : ''}`}
                  placeholder="Пароль"
                  name="registerPassword"
                  value={formData.registerPassword}
                  onChange={handleChange}
                />
                {formErrors.registerPassword && <FaExclamationCircle className="input-error-icon" />}
                {formErrors.registerPassword && <p className="text-center text-danger mt-1">{formErrors.registerPassword}</p>}
              </div>
              <div className="mb-3 text-start position-relative">
                <input
                  type="password"
                  className={`form-control ${formErrors.confirmPassword ? 'input-error' : ''}`}
                  placeholder="Подтвердите пароль"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {formErrors.confirmPassword && <FaExclamationCircle className="input-error-icon" />}
                {formErrors.confirmPassword && <p className="text-center text-danger mt-1">{formErrors.confirmPassword}</p>}
              </div>
              <button type="submit" className="btn btn-outline-warning mt-1">
                Зарегистрироваться
              </button>
              {formData.error && <p className="text-danger mt-4">{formData.error}</p>}
            </form>
          </Tab>
          <Tab eventKey="resetPassword" title="Забыли пароль?">
            <form className="mt-4 text-center" onSubmit={handleResetPassword}>
              <div className="mb-3 text-start position-relative">
                <input
                  type="email"
                  className={`form-control ${formErrors.resetEmail ? 'input-error' : ''}`}
                  placeholder="Введите ваш email"
                  name="resetEmail"
                  value={formData.resetEmail}
                  onChange={handleChange}
                />
                {formErrors.resetEmail && <FaExclamationCircle className="input-error-icon" />}
                {formErrors.resetEmail && <p className="text-center text-danger mt-1">{formErrors.resetEmail}</p>}
              </div>
              <button type="submit" className="btn btn-outline-warning">
                Восстановить пароль
              </button>
              {formData.error && <p className="text-center text-danger mt-3">{formData.error}</p>}
            </form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;