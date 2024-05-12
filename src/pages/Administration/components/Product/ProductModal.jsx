import React from 'react';
import { Modal, Form } from 'react-bootstrap';

const ProductModal = ({
    show,
    onHide,
    currentProduct,
    categories,
    formErrors,
    handleInputChange,
    handleAddOrUpdateProduct,
}) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{currentProduct.productId ? 'Изменить продукт' : 'Добавить продукт'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="productName" className="mt-2">
                        <Form.Label>Название продукта</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentProduct.productName || ''}
                            onChange={e => handleInputChange('productName', e.target.value)}
                            style={{ width: '100%' }}
                        />
                        {formErrors.productName && <Form.Text className="text-danger">{formErrors.productName}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="description" className="mt-2">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={currentProduct.description || ''}
                            onChange={e => handleInputChange('description', e.target.value)}
                            style={{ width: '100%' }}
                        />
                        {formErrors.description && <Form.Text className="text-danger">{formErrors.description}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="manufacturer" className="mt-2">
                        <Form.Label>Производитель</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentProduct.manufacturer || ''}
                            onChange={e => handleInputChange('manufacturer', e.target.value)}
                            style={{ width: '100%' }}
                        />
                        {formErrors.manufacturer && <Form.Text className="text-danger">{formErrors.manufacturer}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="composition" className="mt-2">
                        <Form.Label>Состав</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={currentProduct.composition || ''}
                            onChange={e => handleInputChange('composition', e.target.value)}
                            style={{ width: '100%' }}
                        />
                        {formErrors.composition && <Form.Text className="text-danger">{formErrors.composition}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="storageConditions" className="mt-2">
                        <Form.Label>Условия хранения</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentProduct.storageConditions || ''}
                            onChange={e => handleInputChange('storageConditions', e.target.value)}
                            style={{ width: '100%' }}
                        />
                        {formErrors.storageConditions && <Form.Text className="text-danger">{formErrors.storageConditions}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="shelfLife" className="mt-2">
                        <Form.Label>Срок годности (в днях)</Form.Label>
                        <Form.Control
                            type="number"
                            value={currentProduct.shelfLife || ''}
                            onChange={e => handleInputChange('shelfLife', e.target.value)}
                            style={{ width: '100%' }}
                        />
                        {formErrors.shelfLife && <Form.Text className="text-danger">{formErrors.shelfLife}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="calories" className="mt-2">
                        <Form.Label>Калории</Form.Label>
                        <Form.Control
                            type="number"
                            value={currentProduct.calories || ''}
                            onChange={e => handleInputChange('calories', e.target.value)}
                            style={{ width: '100%' }}
                        />
                        {formErrors.calories && <Form.Text className="text-danger">{formErrors.calories}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="proteins" className="mt-2">
                        <Form.Label>Белки</Form.Label>
                        <Form.Control
                            type="number"
                            value={currentProduct.proteins || ''}
                            onChange={e => handleInputChange('proteins', e.target.value)}
                            style={{ width: '100%' }}
                        />
                        {formErrors.proteins && <Form.Text className="text-danger">{formErrors.proteins}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="fats" className="mt-2">
                        <Form.Label>Жиры</Form.Label>
                        <Form.Control
                            type="number"
                            value={currentProduct.fats || ''}
                            onChange={e => handleInputChange('fats', e.target.value)}
                            style={{ width: '100%' }}
                        />
                        {formErrors.fats && <Form.Text className="text-danger">{formErrors.fats}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="carbohydrates" className="mt-2">
                        <Form.Label>Углеводы</Form.Label>
                        <Form.Control
                            type="number"
                            value={currentProduct.carbohydrates || ''}
                            onChange={e => handleInputChange('carbohydrates', e.target.value)}
                            style={{ width: '100%' }}
                        />
                        {formErrors.carbohydrates && <Form.Text className="text-danger">{formErrors.carbohydrates}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="subcategoryId" className="mt-2">
                        <Form.Label>Подкатегория</Form.Label>
                        <Form.Select
                            value={currentProduct.subcategoryId || ''}
                            onChange={e => handleInputChange('subcategoryId', e.target.value)}
                            style={{ width: '100%' }}
                        >
                            <option value="">Выберите подкатегорию</option>
                            {categories.map(category => (
                                category.subcategories.map(subcategory => (
                                    <option key={subcategory.subcategoryId} value={subcategory.subcategoryId}>
                                        {subcategory.subcategoryName}
                                    </option>
                                ))
                            ))}
                        </Form.Select>
                        {formErrors.subcategoryId && <Form.Text className="text-danger">{formErrors.subcategoryId}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="image" className="mt-2">
                        <Form.Label>URL изображения</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentProduct.image || ''}
                            onChange={e => handleInputChange('image', e.target.value)}
                            style={{ width: '100%' }}
                        />
                        {formErrors.image && <Form.Text className="text-danger">{formErrors.image}</Form.Text>}
                    </Form.Group>

                    <div className="mt-5 d-flex justify-content-end">
                        <button
                            className="btn btn-outline-secondary me-2"
                            onClick={onHide}
                            type="button"
                        >
                            Отмена
                        </button>
                        <button
                            className="btn btn-outline-warning"
                            onClick={handleAddOrUpdateProduct}
                            type="button"
                        >
                            {currentProduct.productId ? 'Сохранить изменения' : 'Добавить продукт'}
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProductModal;