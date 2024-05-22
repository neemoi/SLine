import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreTable from './StoreTable';
import StoreForm from './StoreForm';
import PaginationComponent from './PaginationComponent';
import '../../styles/AdminPage.css';

function AdminStores() {
    const navigate = useNavigate();
    const [stores, setStores] = useState([]);
    const [chains, setChains] = useState([]);
    const [filteredStores, setFilteredStores] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentStore, setCurrentStore] = useState({
        storeId: 0,
        storeName: '',
        city: '',
        address: '',
        chainId: 0
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
            fetchStores();
            fetchChains();
        }
    }, [navigate]);

    const fetchStores = () => {
        fetch('https://localhost:7036/GetAllStore')
            .then(response => response.json())
            .then(data => {
                setStores(data);
                setFilteredStores(data); 
            })
            .catch(error => console.error('Error fetching stores:', error));
    };

    const fetchChains = () => {
        fetch('https://localhost:7036/GetAllChainOfStore')
            .then(response => response.json())
            .then(data => {
                setChains(data);
            })
            .catch(error => console.error('Error fetching chains:', error));
    };

    const handleSort = (field) => {
        const isAsc = sortField === field && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortField(field);

        const sortedStores = [...filteredStores].sort((a, b) => {
            if (a[field] < b[field]) {
                return isAsc ? -1 : 1;
            }
            if (a[field] > b[field]) {
                return isAsc ? 1 : -1;
            }
            return 0;
        });

        setFilteredStores(sortedStores);
    };

    const totalPages = Math.ceil(filteredStores.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleShowCreateModal = () => {
        setCurrentStore({
            storeId: 0,
            storeName: '',
            city: '',
            address: '',
            chainId: 0
        });
        setCreateFormErrors({});
        setShowCreateModal(true);
    };

    const handleShowEditModal = (store) => {
        setCurrentStore(store);
        setCreateFormErrors({});
        setShowEditModal(true);
    };

    const handleInputChange = (name, value) => {
        setCurrentStore(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!currentStore.storeName) errors.storeName = 'Поле Название магазина обязательно';
        if (!currentStore.city) errors.city = 'Поле Город обязательно';
        if (!currentStore.address) errors.address = 'Поле Адрес обязательно';
        if (!currentStore.chainId) errors.chainId = 'Поле Сеть магазинов обязательно';
        setCreateFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddOrUpdateStore = () => {
        if (!validateForm()) return;

        const url = currentStore.storeId === 0
            ? 'https://localhost:7036/AddStore'
            : 'https://localhost:7036/UpdateStore';

        const method = currentStore.storeId === 0 ? 'POST' : 'PUT';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentStore)
        })
        .then(response => response.json())
        .then(data => {
            fetchStores();
            setShowCreateModal(false);
            setShowEditModal(false);
        })
        .catch(error => console.error('Error adding/updating store:', error));
    };

    const handleDeleteStore = (storeId) => {
        fetch(`https://localhost:7036/DeleteStore/${storeId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            fetchStores();
        })
        .catch(error => console.error('Error deleting store:', error));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStores = filteredStores.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mt-5">
                <h2>Управление магазинами</h2>
                <button onClick={handleShowCreateModal} className="btn btn-outline-success mt-1">
                    Добавить магазин
                </button>
            </div>
            <hr />
            <StoreTable
                stores={currentStores}
                chains={chains}
                handleSort={handleSort}
                deleteStore={handleDeleteStore}
                handleShowModal={handleShowEditModal}
            />
            <StoreForm
                show={showCreateModal || showEditModal}
                onHide={() => { setShowCreateModal(false); setShowEditModal(false); }}
                currentStore={currentStore}
                chains={chains}
                formErrors={createFormErrors}
                handleInputChange={handleInputChange}
                handleAddOrUpdateStore={handleAddOrUpdateStore}
            />
            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
            <div className='store-bottom'></div>
        </div>
    );
}

export default AdminStores;