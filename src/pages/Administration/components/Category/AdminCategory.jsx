import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryHeader from './CategoryHeader';
import CategoryTable from './CategoryTable';
import CategoryModal from './CategoryModal';
import '../../styles/AdminPage.css';

function AdminCategory() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({});
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'Admin') {
            navigate('/');
        } else {
            refreshCategories();
        }
    }, [navigate]);

    const refreshCategories = () => {
        fetch('https://localhost:7036/GetAllCategories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    };

    const handleShowModal = (category = {}) => {
        setCurrentCategory(category);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentCategory({});
    };

    const handleSubmit = () => {
        const url = currentCategory.categoryId ? `https://localhost:7036/UpdateCategory` : `https://localhost:7036/AddCategory`;
        const method = currentCategory.categoryId ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentCategory),
        })
            .then(() => {
                handleCloseModal();
                refreshCategories();
            })
            .catch(error => console.error('Error saving category:', error));
    };

    const handleDelete = (categoryId) => {
        if (window.confirm('Вы уверены, что хотите удалить эту категорию?')) {
            fetch(`https://localhost:7036/DeleteCategory/${categoryId}`, {
                method: 'DELETE',
            })
                .then(() => refreshCategories())
                .catch(error => console.error('Error deleting category:', error));
        }
    };

    const handleSort = (field) => {
        const isAsc = sortField === field && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortField(field);
    };

    const sortedCategories = [...categories].sort((a, b) => {
        if (sortField) {
            const valueA = a[sortField];
            const valueB = b[sortField];

            if (sortOrder === 'asc') {
                return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
            } else {
                return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
            }
        }
        return 0;
    });

    return (
        <div className="table-container">
            <CategoryHeader onAddCategory={() => handleShowModal()} />

            <hr />
            
            <CategoryTable
                categories={sortedCategories}
                onEditCategory={handleShowModal}
                onDeleteCategory={handleDelete}
                onSort={handleSort}
                sortField={sortField}
                sortOrder={sortOrder}
            />

            <CategoryModal
                show={showModal}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
            />

            <div className="admin-category-bottom"></div>
        </div>
    );
}

export default AdminCategory;