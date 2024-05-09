import React from 'react';
import { Table } from 'react-bootstrap';

function CategoryTable({ categories, onEditCategory, onDeleteCategory, onSort, sortField, sortOrder }) {
    const renderSortIcon = (field) => {
        if (sortField === field) {
            return sortOrder === 'asc' ? '↑' : '↓';
        }
        return '';
    };

    return (
        <Table striped bordered hover className="mt-5 rounded-table">
            <thead>
                <tr>
                    <th onClick={() => onSort('categoryId')}>
                        ID{renderSortIcon('categoryId')}
                    </th>
                    <th onClick={() => onSort('categoryName')}>
                        Название{renderSortIcon('categoryName')}
                    </th>
                    <th onClick={() => onSort('categoryImage')}>
                        Изображение{renderSortIcon('categoryImage')}
                    </th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                    <tr key={category.categoryId}>
                        <td>{category.categoryId}</td>
                        <td>{category.categoryName}</td>
                        <td>{category.categoryImage}</td>
                        <td>
                            <button onClick={() => onEditCategory(category)} className="btn btn-outline-dark">
                                Редактировать
                            </button>
                            <button
                                onClick={() => onDeleteCategory(category.categoryId)}
                                className="btn btn-outline-danger"
                                style={{ marginLeft: '20px' }}
                            >
                                Удалить
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default CategoryTable;