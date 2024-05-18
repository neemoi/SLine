import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChainOfStoreTable from './ChainOfStoreTable';
import ChainOfStoreForm from './ChainOfStoreForm';
import PaginationComponent from './PaginationComponent';
import '../../styles/AdminPage.css';

function ChainsOfStoresPage() {
    const navigate = useNavigate();
    const [chains, setChains] = useState([]);
    const [filteredChains, setFilteredChains] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentChain, setCurrentChain] = useState({
        chainId: 0,
        chainName: '',
        description: ''
    });
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [createFormErrors, setCreateFormErrors] = useState({});

    useEffect(() => {
        fetchChains();
    }, []);

    const fetchChains = () => {
        fetch('https://localhost:7036/GetAllChainOfStore')
            .then(response => response.json())
            .then(data => {
                setChains(data);
                setFilteredChains(data);
            })
            .catch(error => console.error('Error fetching chains:', error));
    };

    const handleSort = (field) => {
        const isAsc = sortField === field && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortField(field);

        const sortedChains = [...filteredChains].sort((a, b) => {
            if (a[field] < b[field]) {
                return isAsc ? -1 : 1;
            }
            if (a[field] > b[field]) {
                return isAsc ? 1 : -1;
            }
            return 0;
        });

        setFilteredChains(sortedChains);
    };

    const totalPages = Math.ceil(filteredChains.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleShowCreateModal = () => {
        setCurrentChain({
            chainId: 0,
            chainName: '',
            description: ''
        });
        setCreateFormErrors({});
        setShowCreateModal(true);
    };

    const handleShowEditModal = (chain) => {
        setCurrentChain(chain);
        setCreateFormErrors({});
        setShowEditModal(true);
    };

    const handleInputChange = (name, value) => {
        setCurrentChain(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!currentChain.chainName) errors.chainName = 'Поле Название сети обязательно';
        if (!currentChain.description) errors.description = 'Поле Описание обязательно';
        setCreateFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddOrUpdateChain = () => {
        if (!validateForm()) return;

        const url = currentChain.chainId === 0
            ? 'https://localhost:7036/AddChainOfStore'
            : 'https://localhost:7036/UpdateChainOfStore';

        const method = currentChain.chainId === 0 ? 'POST' : 'PUT';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentChain)
        })
        .then(response => response.json())
        .then(data => {
            fetchChains();
            setShowCreateModal(false);
            setShowEditModal(false);
        })
        .catch(error => console.error('Error adding/updating chain:', error));
    };

    const handleDeleteChain = (chainId) => {
        if (window.confirm('Вы уверены, что хотите удалить эту сеть магазинов?')) {
            fetch(`https://localhost:7036/DeleteChainOfStore/${chainId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                fetchChains();
            })
            .catch(error => console.error('Error deleting chain:', error));
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentChains = filteredChains.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mt-5">
                <h2>Управление сетями магазинов</h2>
                <button onClick={handleShowCreateModal} className="btn btn-outline-success mt-1">
                    Добавить сеть магазинов
                </button>
            </div>
            <hr />
            <ChainOfStoreTable
                chains={currentChains}
                handleSort={handleSort}
                deleteChain={handleDeleteChain}
                handleShowModal={handleShowEditModal}
            />
            <ChainOfStoreForm
                show={showCreateModal || showEditModal}
                onHide={() => { setShowCreateModal(false); setShowEditModal(false); }}
                currentChain={currentChain}
                formErrors={createFormErrors}
                handleInputChange={handleInputChange}
                handleAddOrUpdateChain={handleAddOrUpdateChain}
            />
            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
            <div className='chainofstore-bottom'></div>
        </div>
    );
}

export default ChainsOfStoresPage;
