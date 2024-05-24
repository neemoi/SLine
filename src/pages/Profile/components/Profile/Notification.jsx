import React, { useEffect } from 'react';

function Notification({ message, type, clearNotification }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            clearNotification();
        }, 3000);
        return () => clearTimeout(timer);
    }, [clearNotification]);

    return (
        <div className={`notification ${type}`}>
            {message}
        </div>
    );
}

export default Notification;