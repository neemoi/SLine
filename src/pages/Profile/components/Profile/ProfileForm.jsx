import React from 'react';

function ProfileForm({ formData, handleSubmit, handleChange, openModal }) {
    return (
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
            <div className='profile-bottom'></div>
            <div className='profileAuth-bottom'></div>
        </form>
    );
}

export default ProfileForm;
