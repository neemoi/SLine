import React from 'react';

function ScrollButton({ scrollToTop }) {
    return (
        <button className="btn-floating" onClick={scrollToTop}>
            <i className="fas fa-arrow-up"></i>
        </button>
    );
}

export default ScrollButton;