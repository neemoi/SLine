import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import './styles/AdminPage.css';

function AdminPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'Admin') {
            navigate('/');
        }
    }, [navigate]); 

    return (
        <div className="admin-page">
            <h1>Администрирование</h1>
            <div className="admin-cards">
                <div className="admin-card">
                    <Link to="/admin/category">
                        <div className="admin-card-content">
                            <h3>Категории</h3>
                            <p>Управление категориями</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="admin-cards">
                <div className="admin-card">
                    <Link to="/admin/subcategory">
                        <div className="admin-card-content">
                            <h3>Подкатегории</h3>
                            <p>Управление подкатегориями</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="admin-cards">
                <div className="admin-card">
                    <Link to="/admin/delivery">
                        <div className="admin-card-content">
                            <h3>Доставка</h3>
                            <p>Управление доставками</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="admin-cards">
                <div className="admin-card">
                    <Link to="/admin/product">
                        <div className="admin-card-content">
                            <h3>Продкуты</h3>
                            <p>Управление продуктами</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="admin-cards">
                <div className="admin-card">
                    <Link to="/admin/warehouse">
                        <div className="admin-card-content">
                            <h3>Склады</h3>
                            <p>Управление складами</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="admin-cards">
                <div className="admin-card">
                    <Link to="/admin/store">
                        <div className="admin-card-content">
                            <h3>Магазины</h3>
                            <p>Управление магазинами</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="admin-cards">
                <div className="admin-card">
                    <Link to="/admin/chainsStores">
                        <div className="admin-card-content">
                            <h3>Сети магазинов</h3>
                            <p>Управление сетью магазинов</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='admin-bottom'></div>
        </div>
    );
}

export default AdminPage;