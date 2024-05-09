import React from 'react';
import { Modal } from 'react-bootstrap';
import CategoryForm from './CategoryForm';

function CategoryModal({ show, onClose, onSubmit, currentCategory, setCurrentCategory }) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{currentCategory.categoryId ? 'Редактировать категорию' : 'Добавить категорию'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CategoryForm currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
            </Modal.Body>
            <Modal.Footer>
                <button onClick={onClose} className="btn btn-outline-secondary">
                    Отмена
                </button>
                <button onClick={onSubmit} className="btn btn-outline-warning">
                    Сохранить
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default CategoryModal;