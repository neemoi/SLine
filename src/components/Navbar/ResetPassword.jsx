import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/ResetPassword.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: '',
    token: '',
    newPassword: '',
    confirmPassword: '',
    error: null,
  });
  const [submitted, setSubmitted] = useState(false); 
  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    const email = query.get('email');
    const token = query.get('token');
    if (email && token) {
      setFormData((prevData) => ({
        ...prevData,
        email,
        token,
      }));
    } else {
      navigate('/');
    }
  }, [navigate, query]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true); 

    if (formData.newPassword !== formData.confirmPassword) {
      setFormData((prevData) => ({
        ...prevData,
        error: 'Пароли не совпадают',
      }));
      return;
    }

    if (formData.newPassword.length < 6) {
      setFormData((prevData) => ({
        ...prevData,
        error: 'Пароль должен содержать не менее 6 символов',
      }));
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!passwordRegex.test(formData.newPassword)) {
      setFormData((prevData) => ({
        ...prevData,
        error: 'Пароль должен содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ',
      }));
      return;
    }

    try {
      const response = await fetch('https://localhost:7036/Authorization/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          token: formData.token,
          newPassword: formData.newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          error: data.message,
        }));
        return;
      }

      alert('Пароль успешно сброшен');
      navigate('/');
    } catch (error) {
      setFormData((prevData) => ({
        ...prevData,
        error: 'Произошла ошибка. Пожалуйста, попробуйте еще раз.',
      }));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className='mt-5'>Сброс пароля</h2>
      <hr />
      <form onSubmit={handleSubmit} className='mt-5'>
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            {formData.error && <p className="text-danger mt-3">{formData.error}</p>}
            <div className="mb-3 mt-5 text-center">
              <input
                type="password"
                className="form-control"
                name="newPassword"
                placeholder="Новый пароль"
                value={formData.newPassword}
                onChange={handleChange}
              />
              {submitted && formData.newPassword === '' && <p className="text-danger">Это поле обязательно</p>}
            </div>
            <div className="mb-3 text-center">
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                placeholder="Подтвердите пароль"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {submitted && formData.confirmPassword === '' && <p className="text-danger">Это поле обязательно</p>}
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-outline-warning mt-3">Сбросить пароль</button>
            </div>
          </div>
        </div>
      </form>
      <div className='resetPass-bottom'></div>
    </div>
  );
}

export default ResetPassword;