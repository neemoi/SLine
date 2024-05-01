import React from 'react';

function OrderFilter({ sortOrder, onSortChange }) {
    return (
        <div className="col-md-6 mt-3 text-end">
            <select
                className="form-select"
                value={sortOrder}
                onChange={(e) => onSortChange(e.target.value)}
            >
                <option value="asc">Старые заказы</option>
                <option value="desc">Более свежие заказы</option>
            </select>
        </div>
    );
}

export default OrderFilter;