import React from 'react';
import { Table, Pagination } from 'react-bootstrap';

function SubCategoryTable({
  currentSubCategories,
  handleSort,
  renderSortIcon,
  handleShowModal,
  handleDelete,
  currentPage,
  handlePageChange,
  sortedSubCategories,
  itemsPerPage,
}) {
  return (
    <div>
      <Table striped bordered hover className="mt-5 rounded-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('subCategoryId')}>
              ID{renderSortIcon('subCategoryId')}
            </th>
            <th onClick={() => handleSort('subCategoryName')}>
              Название{renderSortIcon('subCategoryName')}
            </th>
            <th onClick={() => handleSort('subCategoryImage')}>
              Изображение{renderSortIcon('subCategoryImage')}
            </th>
            <th onClick={() => handleSort('categoryId')}>
              Категория{renderSortIcon('categoryId')}
            </th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {currentSubCategories.map((subCategory) => (
            <tr key={subCategory.subCategoryId}>
              <td>{subCategory.subCategoryId}</td>
              <td>{subCategory.subCategoryName}</td>
              <td>{subCategory.subCategoryImage}</td>
              <td>{subCategory.categoryId}</td>
              <td>
                <button
                  onClick={() => handleShowModal(subCategory)}
                  className="btn btn-outline-dark"
                >
                  Изменить
                </button>
                <button
                  onClick={() => handleDelete(subCategory.subCategoryId)}
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
      <Pagination className="mt-5 justify-content-center">
        {[...Array(Math.ceil(sortedSubCategories.length / itemsPerPage))].map(
          (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </div>
  );
}

export default SubCategoryTable;