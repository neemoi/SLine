import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubCategoryTable from './SubCategoryTable';
import SubCategoryModal from './SubCategoryModal';
import '../../styles/AdminPage.css';

function AdminSubCategory() {
    const navigate = useNavigate();
    const [subCategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentSubCategory, setCurrentSubCategory] = useState({});
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'Admin') {
            navigate('/');
        } else {
            refreshSubCategories();
            refreshCategories();
        }
    }, [navigate]);

    const refreshSubCategories = () => {
        fetch('https://localhost:7036/GetAllSubCategories')
            .then(response => response.json())
            .then(data => setSubCategories(data))
            .catch(error => console.error('Ошибка при получении подкатегорий:', error));
    };

    const refreshCategories = () => {
        fetch('https://localhost:7036/GetAllCategories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Ошибка при получении категорий:', error));
    };

    const handleShowModal = (subCategory = {}) => {
        setCurrentSubCategory(subCategory);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentSubCategory({});
    };

    const handleSubmit = () => {
        const url = currentSubCategory.subCategoryId ? 'https://localhost:7036/UpdateSubCategory' : 'https://localhost:7036/AddSubCategory';
        const method = currentSubCategory.subCategoryId ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentSubCategory),
        })
            .then(async response => {
                if (!response.ok) {
                    const errorData = await response.json();
                    
                    if (errorData.message && errorData.message.includes('A subcategory named')) {
                        alert('Подкатегория с таким именем уже существует. Пожалуйста, выберите другое имя.');
                    } else {
                        console.error('Error when saving a subcategory:', errorData);
                    }
                } else {
                    handleCloseModal();
                    refreshSubCategories();
                }
            })
            .catch(error => console.error('Error when saving a subcategory:', error));
    };

    const handleDelete = (subCategoryId) => {
        if (window.confirm('Вы уверены, что хотите удалить эту подкатегорию?')) {
            fetch(`https://localhost:7036/DeleteSubCategory/${subCategoryId}`, {
                method: 'DELETE',
            })
                .then(() => refreshSubCategories())
                .catch(error => console.error('Error when deleting a subcategory:', error));
        }
    };

    const handleSort = (field) => {
        const isAsc = sortField === field && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortField(field);
    };

    const sortedSubCategories = [...subCategories].sort((a, b) => {
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSubCategories = sortedSubCategories.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderSortIcon = (field) => {
        if (sortField === field) {
            return sortOrder === 'asc' ? ' ↑' : ' ↓';
        }
        return '';
    };

    return (
        <div className="table-container">
            <div className="d-flex justify-content-between align-items-center mt-5">
                <h2>Управление подкатегориями</h2>
                <button onClick={() => handleShowModal()} className="btn btn-outline-success mt-1">
                    Добавить подкатегорию
                </button>
            </div>
            <hr />
            
            <SubCategoryTable
                currentSubCategories={currentSubCategories}
                handleSort={handleSort}
                renderSortIcon={renderSortIcon}
                handleShowModal={handleShowModal}
                handleDelete={handleDelete}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                sortedSubCategories={sortedSubCategories}
                itemsPerPage={itemsPerPage}
            />

            <SubCategoryModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                handleSubmit={handleSubmit}
                currentSubCategory={currentSubCategory}
                setCurrentSubCategory={setCurrentSubCategory}
                categories={categories}
            />

            <div className='subcategory-bottom'></div>
        </div>
    );
}

export default AdminSubCategory;