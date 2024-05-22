import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WarehouseTable from './WarehouseTable';
import WarehouseForm from './WarehouseForm';
import PaginationComponent from './PaginationComponent';
import WarehouseSearchBar from './WarehouseSearchBar';
import '../../styles/AdminPage.css';

function AdminWarehouses() {
    const navigate = useNavigate();
    const [warehouses, setWarehouses] = useState([]);
    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredWarehouses, setFilteredWarehouses] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentWarehouse, setCurrentWarehouse] = useState({
        warehouseId: 0,
        storeId: 0,
        productId: 0,
        quantity: 0,
        productPrice: 0,
        storeName: '',
        city: '',
        address: ''
    });
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [createFormErrors, setCreateFormErrors] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'Admin') {
            navigate('/');
        } else {
            fetchWarehouses();
            fetchStores();
            fetchProducts();
        }
    }, [navigate]);

    const fetchWarehouses = () => {
        fetch('https://localhost:7036/GetAllWarehouses')
            .then(response => response.json())
            .then(data => {
                setWarehouses(data);
                setFilteredWarehouses(data); 
            })
            .catch(error => console.error('Error fetching warehouses:', error));
    };

    const fetchStores = () => {
        fetch('https://localhost:7036/GetAllWarehouses')
            .then(response => response.json())
            .then(data => {
                const uniqueStores = [...new Set(data.map(item => item.storeId))];
                const storeData = uniqueStores.map(storeId => {
                    const storeDetails = data.find(item => item.storeId === storeId);
                    return {
                        storeId: storeDetails.storeId,
                        storeName: storeDetails.storeName,
                        city: storeDetails.city,
                        address: storeDetails.address
                    };
                });
                setStores(storeData);
            })
            .catch(error => console.error('Error fetching stores:', error));
    };

    const fetchProducts = () => {
        fetch('https://localhost:7036/GetAllProducts')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    const handleSort = (field) => {
        const isAsc = sortField === field && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortField(field);

        const sortedWarehouses = [...filteredWarehouses].sort((a, b) => {
            if (a[field] < b[field]) {
                return isAsc ? -1 : 1;
            }
            if (a[field] > b[field]) {
                return isAsc ? 1 : -1;
            }
            return 0;
        });

        setFilteredWarehouses(sortedWarehouses);
    };

    const totalPages = Math.ceil(filteredWarehouses.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleShowCreateModal = () => {
        setCurrentWarehouse({
            warehouseId: 0,
            storeId: 0,
            productId: 0,
            quantity: 0,
            productPrice: 0,
        });
        setCreateFormErrors({});
        setShowCreateModal(true);
    };

    const handleShowEditModal = (warehouse) => {
        setCurrentWarehouse(warehouse);
        setCreateFormErrors({});
        setShowEditModal(true);
    };

    const handleInputChange = (name, value) => {
        setCurrentWarehouse(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!currentWarehouse.storeId) errors.storeId = 'Поле ID магазина обязательно';
        if (!currentWarehouse.productId) errors.productId = 'Поле ID продукта обязательно';
        if (!currentWarehouse.quantity) errors.quantity = 'Поле Количество обязательно';
        if (!currentWarehouse.productPrice) errors.productPrice = 'Поле Цена продукта обязательно';
        setCreateFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddOrUpdateWarehouse = () => {
        if (!validateForm()) return;

        const url = currentWarehouse.warehouseId === 0
            ? 'https://localhost:7036/AddWarehouse'
            : 'https://localhost:7036/UpdateWarehouse';

        const method = currentWarehouse.warehouseId === 0 ? 'POST' : 'PUT';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentWarehouse)
        })
        .then(response => response.json())
        .then(data => {
            fetchWarehouses();
            setShowCreateModal(false);
            setShowEditModal(false);
        })
        .catch(error => console.error('Error adding/updating warehouse:', error));
    };

    const handleDeleteWarehouse = (warehouseId) => {
        fetch(`https://localhost:7036/DeleteWarehouse/${warehouseId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            fetchWarehouses();
        })
        .catch(error => console.error('Error deleting warehouse:', error));
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);

        if (!query) {
            setFilteredWarehouses(warehouses);
            return;
        }

        const filtered = warehouses.filter(warehouse =>
            warehouse.storeName.toLowerCase().includes(query.toLowerCase()) ||
            warehouse.city.toLowerCase().includes(query.toLowerCase()) ||
            warehouse.address.toLowerCase().includes(query.toLowerCase()) ||
            products.some(product => product.productId === warehouse.productId && product.productName.toLowerCase().includes(query.toLowerCase()))
        );

        setFilteredWarehouses(filtered);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentWarehouses = filteredWarehouses.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mt-5">
                <h2>Управление складами</h2>
                <button onClick={handleShowCreateModal} className="btn btn-outline-success mt-1">
                    Добавить склад
                </button>
            </div>
            <hr />
            <WarehouseSearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
            <WarehouseTable
                warehouses={currentWarehouses}
                stores={stores}
                products={products}
                handleSort={handleSort}
                deleteWarehouse={handleDeleteWarehouse}
                handleShowModal={handleShowEditModal}
            />
            <WarehouseForm
                show={showCreateModal || showEditModal}
                onHide={() => { setShowCreateModal(false); setShowEditModal(false); }}
                currentWarehouse={currentWarehouse}
                stores={stores}
                products={products}
                formErrors={createFormErrors}
                handleInputChange={handleInputChange}
                handleAddOrUpdateWarehouse={handleAddOrUpdateWarehouse}
            />
            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
            <div className='warehouse-bottom'></div>
        </div>
    );
}

export default AdminWarehouses;