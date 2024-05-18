import React from 'react';
import { Form } from 'react-bootstrap';

function CategoryForm({ currentCategory, setCurrentCategory, errors }) {
    const handleChange = (e) => {
        const { id, value } = e.target;
        setCurrentCategory((prevCategory) => ({
            ...prevCategory,
            [id]: value,
        }));
    };

    return (
        <Form>
            <Form.Group controlId="categoryName" className="mt-2" style={{ textAlign: 'center' }}>
                <Form.Label>Название категории</Form.Label>
                <Form.Control
                    type="text"
                    value={currentCategory.categoryName || ''}
                    onChange={handleChange}
                    isInvalid={!!errors.categoryName}
                    style={{ width: '100%' }}
                />
                <Form.Control.Feedback type="invalid" style={{ color: 'red'}}>
                    {errors.categoryName}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="categoryImage" className="mt-4" style={{ textAlign: 'center' }}>
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                    type="text"
                    value={currentCategory.categoryImage || ''}
                    onChange={handleChange}
                    isInvalid={!!errors.categoryImage}
                    style={{ width: '100%' }}
                />
                <Form.Control.Feedback type="invalid" style={{ color: 'red' }}>
                    {errors.categoryImage}
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
    );
}

export default CategoryForm;