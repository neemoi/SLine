import React from 'react';
import SubcategoryCard from './SubcategoryCard';

function SubcategoriesList({ subcategories, categoryId }) {
    const splitIntoRows = (arr, size) => {
        const rows = [];
        for (let i = 0; i < arr.length; i += size) {
            rows.push(arr.slice(i, i + size));
        }
        return rows;
    };

    return (
        <div className="container mt-5" id="all-subcategories">
            {splitIntoRows(subcategories, 4).map((row, index) => (
                <div className="row row-cols-1 g-3 justify-content-center" key={index}>
                    {row.map(subcategory => (
                        <SubcategoryCard key={subcategory.subcategoryId} subcategory={subcategory} categoryId={categoryId} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default SubcategoriesList;