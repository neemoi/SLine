import React from 'react';
import { Instagram, Telegram, Twitter, Facebook, Phone, Envelope } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer bg-dark text-white py-4 mt-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <h4 className="mb-3" style={{ fontSize: '1rem' }}>SLine</h4>
                        <ul className="list-unstyled" style={{ fontSize: '0.8rem' }}>
                            <li className="mb-2">
                                <Phone />+375-(00)-000-00-00
                            </li>
                            <li>
                                <Envelope /> <a href="mailto:example@example.com">example@example.com</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h4 className="mb-3" style={{ fontSize: '1rem' }}>Соцсети</h4>
                        <ul className="list-inline mb-0" style={{ fontSize: '0.8rem' }}>
                            <li className="list-inline-item me-3"><Link to="#"><Instagram /></Link></li>
                            <li className="list-inline-item me-3"><Link to="#"><Telegram /></Link></li>
                            <li className="list-inline-item me-3"><Link to="#"><Facebook /></Link></li>
                            <li className="list-inline-item"><Link to="#"><Twitter /></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
