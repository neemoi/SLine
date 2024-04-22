import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavbarAuthModal from './NavbarAuthModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Navbar.css';

function Navbar() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <NavLink className="navbar-brand" to="/">LOGO</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/page'>Все товары</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/page1'>Категории</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/page2'>Корзина</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/page3'>Заказы</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/page4'>Профиль</NavLink>
                        </li>
                    </ul>
                </div>
                <NavbarAuthModal show={show} handleClose={handleClose} />
            </div>
        </nav>
    );
}

export default Navbar;
