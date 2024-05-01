import React from 'react';

function BasketNotification({ notification, isNotificationVisible }) {
    return (
        <div className={`notification ${isNotificationVisible ? '' : 'hidden'}`}>
            {notification}
        </div>
    );
}

export default BasketNotification;