import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';

function SubCategoryModal({
    showModal,
    handleCloseModal,
    handleSubmit,
    currentSubCategory,
    setCurrentSubCategory,
    categories,
}) {
    const [errors, setErrors] = useState({});

    const handleFormSubmit = () => {
        const newErrors = {};
        if (!currentSubCategory.subCategoryName) {
            newErrors.subCategoryName = 'Пожалуйста, введите название подкатегории.';
        }
        if (!currentSubCategory.subCategoryImage) {
            newErrors.subCategoryImage = 'Пожалуйста, введите URL изображения.';
        }
        if (!currentSubCategory.categoryId) {
            newErrors.categoryId = 'Пожалуйста, выберите категорию.';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        handleSubmit();
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>{currentSubCategory.subCategoryId ? 'Изменить подкатегорию' : 'Добавить подкатегорию'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="subCategoryName" className="mt-2 text-center">
                        <Form.Label>Название подкатегории</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentSubCategory.subCategoryName || ''}
                            onChange={(e) =>
                                setCurrentSubCategory({
                                    ...currentSubCategory,
                                    subCategoryName: e.target.value,
                                })
                            }
                            isInvalid={!!errors.subCategoryName}
                            style={{ width: '100%' }}
                        />
                        <Form.Control.Feedback type="invalid" style={{ color: 'red' }}>
                            {errors.subCategoryName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="subCategoryImage" className="mt-4 text-center">
                        <Form.Label>URL изображения</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentSubCategory.subCategoryImage || ''}
                            onChange={(e) =>
                                setCurrentSubCategory({
                                    ...currentSubCategory,
                                    subCategoryImage: e.target.value,
                                })
                            }
                            isInvalid={!!errors.subCategoryImage}
                            style={{ width: '100%' }}
                        />
                        <Form.Control.Feedback type="invalid" style={{ color: 'red' }}>
                            {errors.subCategoryImage}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="categoryId" className="mt-4 text-center">
                        <Form.Label>Категория</Form.Label>
                        <Form.Control
                            as="select"
                            value={currentSubCategory.categoryId || ''}
                            onChange={(e) =>
                                setCurrentSubCategory({
                                    ...currentSubCategory,
                                    categoryId: e.target.value,
                                })
                            }
                            isInvalid={!!errors.categoryId}
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map((category) => (
                                <option key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid" style={{ color: 'red' }}>
                            {errors.categoryId}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleCloseModal} className="btn btn-outline-secondary">
                    Отмена
                </button>
                <button onClick={handleFormSubmit} className="btn btn-outline-warning">
                    Сохранить
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default SubCategoryModal;