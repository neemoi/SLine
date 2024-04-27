import React, { useState } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
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
    error: null,
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e, url, method, body) => {
    e.preventDefault();

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
              <div className="mb-3 text-start"></div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="loginEmail"
                  value={formData.loginEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Пароль"
                  name="loginPassword"
                  value={formData.loginPassword}
                  onChange={handleChange}
                />
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
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Имя"
                  name="registerUserName"
                  value={formData.registerUserName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Номер телефона"
                  name="registerPhoneNumber"
                  value={formData.registerPhoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="registerEmail"
                  value={formData.registerEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Пароль"
                  name="registerPassword"
                  value={formData.registerPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Подтвердите пароль"
                  name="confirmPassword"
                 value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-outline-warning mt-1">
                Зарегистрироваться
              </button>
              {formData.error && <p className="text-danger mt-4">{formData.error}</p>}
            </form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;