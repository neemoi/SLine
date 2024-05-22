import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import UserOrdersModal from './UserOrdersModal';
import '../../styles/AdminPage.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userOrders, setUserOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const usersPerPage = 10;

    useEffect(() => {
        fetch('https://localhost:7036/AllInfoAboutUsers')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setFilteredUsers(data);
                setTotalPages(Math.ceil(data.length / usersPerPage));
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);

        fetch(`https://localhost:7036/Order/GetOrders/${user.id}`)
            .then(response => response.json())
            .then(data => setUserOrders(data))
            .catch(error => console.error('Error fetching orders:', error));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setUserOrders([]);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query) {
            const filtered = users.filter(user => user.id.toLowerCase().includes(query.toLowerCase()));
            setFilteredUsers(filtered);
            setTotalPages(Math.ceil(filtered.length / usersPerPage));
            setCurrentPage(1);
        } else {
            setFilteredUsers(users);
            setTotalPages(Math.ceil(users.length / usersPerPage));
        }
    };

    const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

    return (
        <div className="container">
            <h1>Пользователи</h1>
            <hr />
            <input
                type="text"
                placeholder="Поиск по ID"
                value={searchQuery}
                onChange={handleSearchChange}
                className="form-control mb-3"
            />
            <UserList 
                users={paginatedUsers} 
                handleUserClick={handleUserClick} 
                currentPage={currentPage} 
                totalPages={totalPages} 
                handlePageChange={handlePageChange} 
            />
            <UserOrdersModal 
                isModalOpen={isModalOpen} 
                handleCloseModal={handleCloseModal} 
                selectedUser={selectedUser} 
                userOrders={userOrders} 
            />
            <div className='adminUser-bottom'></div>
        </div>
    );
};

export default AdminUsers;