import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavbarAuthModal from './NavbarAuthModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import './styles/Navbar.css';

function Navbar() {

    const [show, setShow] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleClose = () => setShow(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    };

    const handleMenuItemClick = (path) => {
        if (!user) {
            setShow(true);
        } else {
            window.location.href = path; 
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand ml-10" to="/">LOGO</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/page1'>О магазинах</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/allProducts'>Все товары</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/categories'>Категории</NavLink> 
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/page2' onClick={() => handleMenuItemClick('/page2')}>Корзина</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/page3' onClick={() => handleMenuItemClick('/page3')}>Заказы</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/page4' onClick={() => handleMenuItemClick('/page4')}>Профиль</NavLink>
                        </li>
                        {user && user.role === 'Admin' && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/admin'>Администрирование</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
                {!user ? (
                    <NavbarAuthModal show={show} handleClose={handleClose} />
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