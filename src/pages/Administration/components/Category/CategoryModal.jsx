import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import CategoryForm from './CategoryForm';

function CategoryModal({ show, onClose, onSubmit, currentCategory, setCurrentCategory }) {
    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        const newErrors = {};
        if (!currentCategory.categoryName) {
            newErrors.categoryName = 'Пожалуйста, введите название категории.';
        }
        if (!currentCategory.categoryImage) {
            newErrors.categoryImage = 'Пожалуйста, введите URL изображения.';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onSubmit();
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{currentCategory.categoryId ? 'Редактировать категорию' : 'Добавить категорию'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CategoryForm
                    currentCategory={currentCategory}
                    setCurrentCategory={setCurrentCategory}
                    errors={errors}
                />
            </Modal.Body>
            <Modal.Footer>
                <button onClick={onClose} className="btn btn-outline-secondary">
                    Отмена
                </button>
                <button onClick={handleSubmit} className="btn btn-outline-warning">
                    Сохранить
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default CategoryModal;