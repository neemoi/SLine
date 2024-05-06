import React from 'react';
import CategoryCard from './CategoryCard';

function CategoryList({ categories }) {
    const splitIntoRows = (arr, size) => {
        const rows = [];
        for (let i = 0; i < arr.length; i += size) {
            rows.push(arr.slice(i, i + size));
        }
        return rows;
    };

    return (
        <div className="container mt-1">
            <div className="container" id="categories">
                {splitIntoRows(categories, 4).map((row, index) => (
                    <div className="row justify-content-center" key={index}>
                        {row.map((category, idx) => (
                            <CategoryCard key={idx} category={category} />
                        ))}
                    </div>
                ))}
            </div> 
            <div className='bottom-categoryList'></div>
        </div>
    );
}

export default CategoryList;