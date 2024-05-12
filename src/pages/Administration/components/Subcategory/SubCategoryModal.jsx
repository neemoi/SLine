import React from 'react';
import { Modal, Form } from 'react-bootstrap';

function SubCategoryModal({
  showModal,
  handleCloseModal,
  handleSubmit,
  currentSubCategory,
  setCurrentSubCategory,
  categories,
}) {
  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {currentSubCategory.subCategoryId ? 'Изменить подкатегорию' : 'Добавить подкатегорию'}
        </Modal.Title>
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
            />
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
            />
          </Form.Group>

          <Form.Group controlId="categoryId" className="mt-4" style={{ textAlign: 'center' }}>
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
              style={{ width: '54%', marginLeft: '23%' }}
            >
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleCloseModal} className="btn btn-outline-secondary">
          Отмена
        </button>
        <button onClick={handleSubmit} className="btn btn-outline-warning">
          Сохранить
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default SubCategoryModal;