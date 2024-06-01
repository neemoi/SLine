import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import NavbarAuthModal from './NavbarAuthModal';
import { BoxArrowInRight } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Navbar.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; 
import LogoImage from '../../img/SLine.png';

function Navbar() {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleAuthModalClose = () => setShowAuthModal(false);
    const handleAuthModalShow = () => setShowAuthModal(true);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
                    <img src={LogoImage} alt="SLine" /> 
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/storesInformation'>О магазинах</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/allProducts'>Все товары</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/categories'>Категории</NavLink> 
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/basket'>Корзина</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/orders'>Заказы</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/profile'>Профиль</NavLink>
                        </li>
                        {user && user.role === 'Admin' && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/admin'>Администрирование</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
                {!user ? (
                    <div className="navbar-nav ml-auto">
                        <BoxArrowInRight size={24} onClick={handleAuthModalShow} />
                        <NavbarAuthModal show={showAuthModal} handleClose={handleAuthModalClose} />
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <div className="nav-item">
                            <Dropdown>
                                <Dropdown.Toggle variant="link" id="dropdown-basic">
                                    {user.email}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleLogout}>Выход</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;