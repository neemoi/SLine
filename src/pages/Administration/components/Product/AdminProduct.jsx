import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductTable from './ProductTable';
import ProductModal from './ProductModal';
import PaginationControl from './PaginationControl';
import { Form } from 'react-bootstrap';
import '../../styles/AdminPage.css';

function AdminProduct() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentProduct, setCurrentProduct] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [formErrors, setFormErrors] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState('productId');
    const [sortOrder, setSortOrder] = useState('asc');
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'Admin') {
            navigate('/');
        } else {
            fetchProducts();
            fetchCategories();
        }
    }, [navigate]);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = () => {
        fetch('https://localhost:7036/GetAllProducts')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error when receiving products:', error));
    };

    const fetchCategories = () => {
        fetch('https://localhost:7036/Catalog/Categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => console.error('Error when getting categories:', error));
    };

    const handleShowModal = (product = {}) => {
        setCurrentProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentProduct({});
        setFormErrors({});
    };

    const handleAddOrUpdateProduct = () => {
        const errors = validateForm(currentProduct);

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const payload = {
            ...currentProduct
        };

        const method = currentProduct.productId ? 'PUT' : 'POST';
        const url = currentProduct.productId ? 'https://localhost:7036/UpdateProduct' : 'https://localhost:7036/AddProduct';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(async response => {
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error:', errorData);
                } else {
                    handleCloseModal();
                    fetchProducts();
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const deleteProduct = (productId) => {
        if (window.confirm('Вы уверены, что хотите удалить этот продукт?')) {
            fetch(`https://localhost:7036/DeleteProduct/${productId}`, {
                method: 'DELETE',
            })
                .then(() => fetchProducts())
                .catch(error => console.error('Error when deleting the product:', error));
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSort = (column) => {
        const isAscending = sortColumn === column && sortOrder === 'asc';
        const newSortOrder = isAscending ? 'desc' : 'asc';

        setSortColumn(column);
        setSortOrder(newSortOrder);
    };

    const handleInputChange = (field, value) => {
        setCurrentProduct(prevProduct => ({
            ...prevProduct,
            [field]: value,
        }));
        setFormErrors(prev => ({
            ...prev,
            [field]: '',
        }));
    };

    const validateForm = (currentProduct) => {
        const errors = {};
        const requiredFields = [
            { key: 'productName', message: 'Название продукта не может быть пустым' },
            { key: 'description', message: 'Описание не может быть пустым' },
            { key: 'manufacturer', message: 'Производитель не может быть пустым' },
            { key: 'composition', message: 'Состав не может быть пустым' },
            { key: 'storageConditions', message: 'Условия хранения не могут быть пустыми' },
            { key: 'shelfLife', message: 'Срок годности не может быть пустым' },
            { key: 'calories', message: 'Калории не могут быть пустыми' },
            { key: 'proteins', message: 'Белки не могут быть пустыми' },
            { key: 'fats', message: 'Жиры не могут быть пустыми' },
            { key: 'carbohydrates', message: 'Углеводы не могут быть пустыми' },
            { key: 'subcategoryId', message: 'Подкатегория не может быть пустой' },
            { key: 'image', message: 'URL изображения не может быть пустым' },
        ];

        requiredFields.forEach(({ key, message }) => {
            if (!currentProduct[key]) {
                errors[key] = message;
            }
        });

        return errors;
    };

    const getSortedProducts = () => {
        const sortedProducts = [...products];

        sortedProducts.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[sortColumn] > b[sortColumn] ? 1 : -1;
            } else {
                return a[sortColumn] < b[sortColumn] ? 1 : -1;
            }
        });

        return sortedProducts;
    };

    const getFilteredProducts = () => {
        const sortedProducts = getSortedProducts();
        return sortedProducts.filter((product) =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <div className="table-container">
            <div className="d-flex justify-content-between align-items-center mt-5">
                <h2>Управление продуктами</h2>
                <button variant="success" onClick={() => handleShowModal()} className='btn btn-outline-success' type="button">
                    Добавить продукт
                </button>
            </div>
            <hr />
            <Form.Control
                type="text"
                placeholder="Поиск по названию"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='mt-4'
                style={{ width: '100%', marginBottom: '20px' }}
            />
            <ProductTable
                products={getFilteredProducts()}
                handleSort={handleSort}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                deleteProduct={deleteProduct}
                handleShowModal={handleShowModal}
            />
            <PaginationControl
                totalPages={Math.ceil(getFilteredProducts().length / itemsPerPage)}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
            <ProductModal
                show={showModal}
                onHide={handleCloseModal}
                currentProduct={currentProduct}
                categories={categories}
                formErrors={formErrors}
                handleInputChange={handleInputChange}
                handleAddOrUpdateProduct={handleAddOrUpdateProduct}
            />
            <div className='product-bottom'></div>
        </div>
    );
}

export default AdminProduct;