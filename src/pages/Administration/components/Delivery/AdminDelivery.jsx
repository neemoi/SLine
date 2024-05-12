import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryOptionsTable from './DeliveryOptionsTable';
import DeliveryOptionForm from './DeliveryOptionForm';
import PaginationComponent from './PaginationComponent';
import '../../styles/AdminPage.css';

function AdminDeliveryOption() {
    const navigate = useNavigate();
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [stores, setStores] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentOption, setCurrentOption] = useState({});
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [createFormErrors, setCreateFormErrors] = useState({});
    const [editFormErrors, setEditFormErrors] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'Admin') {
            navigate('/');
        } else {
            fetchDeliveryOptions();
            fetchStores();
        }
    }, [navigate]);

    const fetchDeliveryOptions = () => {
        fetch('https://localhost:7036/GetAllDeliveryOption')
            .then(response => response.json())
            .then(data => setDeliveryOptions(data))
            .catch(error => console.error('Error when receiving delivery options:', error));
    };

    const fetchStores = () => {
        fetch('https://localhost:7036/GetAllStore')
            .then(response => response.json())
            .then(data => setStores(data))
            .catch(error => console.error('Error when receiving stores:', error));
    };

    const handleShowCreateModal = () => {
        setCurrentOption({
            deliveryId: '',
            deliveryTime: '',
            deliveryPrice: '',
            storeId: '',
            deliveryType: '',
        });

        setCreateFormErrors({});
        setShowCreateModal(true);
    };

    const handleShowEditModal = (option) => {
        setCurrentOption(option);
        setEditFormErrors({});

        setShowEditModal(true);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
        setCurrentOption({
            deliveryId: '',
            deliveryTime: '',
            deliveryPrice: '',
            storeId: '',
            deliveryType: '',
        });
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const validateForm = (option) => {
        const errors = {};
        if (!option.deliveryId) errors.deliveryId = 'ID доставки не может быть пустым';
        if (!option.deliveryTime) errors.deliveryTime = 'Время доставки не может быть пустым';
        if (!option.deliveryPrice) errors.deliveryPrice = 'Стоимость доставки не может быть пустой';
        if (!option.storeId) errors.storeId = 'Магазин не может быть пустым';
        if (!option.deliveryType) errors.deliveryType = 'Тип доставки не может быть пустым';

        return errors;
    };

    const addDeliveryOption = () => {
        const errors = validateForm(currentOption);
        if (Object.keys(errors).length > 0) {
          setCreateFormErrors(errors);
          return;
        }
      
        fetch('https://localhost:7036/AddDeliveryOption', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentOption),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error when adding a delivery option');
            }
            return response.json();
          })
          .then(() => {
            handleCloseCreateModal();
            fetchDeliveryOptions();
          })
          .catch(error => console.error('Error when adding a delivery option:', error));
      };
      

    const updateDeliveryOption = () => {
        const errors = validateForm(currentOption);
        if (Object.keys(errors).length > 0) {
            setEditFormErrors(errors);
            return;
        }

        const url = 'https://localhost:7036/UpdateDeliveryOption';
        const payload = {
            deliveryId: currentOption.deliveryId,
            deliveryTime: currentOption.deliveryTime,
            deliveryPrice: currentOption.deliveryPrice,
            storeId: currentOption.storeId,
            deliveryType: currentOption.deliveryType,
        };

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(async response => {
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error when updating the delivery option:', errorData);
                } else {
                    handleCloseEditModal();
                    fetchDeliveryOptions();
                }
            })
            .catch(error => console.error('Error updating the delivery option:', error));
    };

    const handleDelete = (optionId) => {
        if (window.confirm('Вы уверены, что хотите удалить эту опцию доставки?')) {
            fetch(`https://localhost:7036/DeleteDeliveryOption/${optionId}`, {
                method: 'DELETE',
            })
                .then(() => fetchDeliveryOptions())
                .catch(error => console.error('Error deleting the delivery option:', error));
        }
    };

    const handleSort = (field) => {
        const isAsc = sortField === field && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortField(field);
    };

    const sortedOptions = [...deliveryOptions].sort((a, b) => {
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
    const currentOptions = sortedOptions.slice(indexOfFirstItem, indexOfLastItem);

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
                <h2>Управление опциями доставки</h2>
                <button onClick={handleShowCreateModal} className="btn btn-outline-success mt-1">
                    Добавить опцию доставки
                </button>
            </div>
            <hr />

            <DeliveryOptionsTable
                currentOptions={currentOptions}
                handleSort={handleSort}
                renderSortIcon={renderSortIcon}
                handleShowEditModal={handleShowEditModal}
                handleDelete={handleDelete}
            />

            <PaginationComponent
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={sortedOptions.length}
                handlePageChange={handlePageChange}
            />

            <DeliveryOptionForm
                show={showCreateModal}
                onHide={handleCloseCreateModal}
                formType="create"
                currentOption={currentOption}
                setCurrentOption={setCurrentOption}
                stores={stores}
                formErrors={createFormErrors}
                handleAction={addDeliveryOption}
            />

            <DeliveryOptionForm
                show={showEditModal}
                onHide={handleCloseEditModal}
                formType="edit"
                currentOption={currentOption}
                setCurrentOption={setCurrentOption}
                stores={stores}
                formErrors={editFormErrors}
                handleAction={updateDeliveryOption}
            />

            <div className='subcategory-bottom'></div>
        </div>
    );
}

export default AdminDeliveryOption;