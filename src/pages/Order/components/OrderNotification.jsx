import React from 'react';

function OrderNotification({ notification, isVisible }) {
    if (!isVisible) {
        return null;
    }

    return (
        <div className="notification">
            {notification}
        </div>
    );
}

export default OrderNotification;