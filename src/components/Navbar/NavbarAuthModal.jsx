import React, { useState } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import { BoxArrowInRight } from 'react-bootstrap-icons'
import './styles/NavbarAuthModal.css'

function AuthModal() {
    const [show, setShow] = useState(false);
    const [activeTab, setActiveTab] = useState('login');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <BoxArrowInRight variant="primary" onClick={handleShow} id="authButton">
                Open Modal
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
                            <form className="mt-3 text-center">
                                <div className="mb-3 text-start"></div>
                                <div className="mb-3">
                                    <input type="email" className="form-control" id="loginEmail" placeholder="Email" />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="loginPassword"
                                        placeholder="Пароль"
                                    />
                                </div>
                                <button type="submit" className="btn btn-outline-primary">
                                    Войти
                                </button>
                            </form>
                        </Tab>
                        <Tab eventKey="register" title="Регистрация">
                            <form className="mt-3  text-center">
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="registerEmail"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="registerPassword"
                                        placeholder="Пароль"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="registerPasswordControl"
                                        placeholder="Пароль"
                                    />
                                </div>
                                <button type="submit" className="btn btn-outline-primary">
                                    Зарегистрироваться
                                </button>
                            </form>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AuthModal;
