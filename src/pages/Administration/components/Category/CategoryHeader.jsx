import React from 'react';

function HeaderComponent({ onAddCategory }) {
    return (
        <div className="d-flex justify-content-between align-items-center mt-5">
            <h2>Управление категориями</h2>
            <button onClick={onAddCategory} className="btn btn-outline-success mt-1">
                Добавить категорию
            </button>
        </div>
    );
}

export default HeaderComponent;