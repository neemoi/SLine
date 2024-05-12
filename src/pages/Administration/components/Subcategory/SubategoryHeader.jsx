import React from 'react';

function HeaderComponent({ onAddSubCategory }) {
    return (
        <div className="d-flex justify-content-between align-items-center mt-5">
            <h2>Управление подкатегориями</h2>
            <button onClick={onAddSubCategory} className="btn btn-outline-success mt-1">
                Добавить подкатегорию
            </button>
        </div>
    );
}

export default HeaderComponent;