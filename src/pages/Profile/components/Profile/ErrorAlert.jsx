import React from 'react';

function ErrorAlert({ error }) {
    return (
        <div className="alert alert-danger">
            {error}
        </div>
    );
}

export default ErrorAlert;