import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductTable = ({ products, handleSort, currentPage, itemsPerPage, deleteProduct, handleShowModal }) => {
    return (
        <div>
            <Table striped bordered hover className="rounded-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('productId')}>ID</th>
                        <th onClick={() => handleSort('productName')}>Название</th>
                        <th onClick={() => handleSort('manufacturer')}>Производитель</th>
                        <th onClick={() => handleSort('shelfLife')}>Срок годности</th>
                        <th onClick={() => handleSort('calories')}>Калории</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(product => (
                        <tr key={product.productId}>
                            <td>{product.productId}</td>
                            <td>
                                <Link to={`/product/${product.productId}`}>
                                    {product.productName}
                                </Link>
                            </td>
                            <td>{product.manufacturer}</td>
                            <td>{product.shelfLife} дн.</td>
                            <td>{product.calories} ккал.</td>
                            <td>
                                <button
                                    onClick={() => handleShowModal(product)}
                                    className="btn btn-outline-dark"
                                    type="button"
                                >
                                    Изменить
                                </button>
                                <button
                                    onClick={() => deleteProduct(product.productId)}
                                    className="btn btn-outline-danger"
                                    style={{ marginLeft: '20px' }}
                                    type="button"
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ProductTable;