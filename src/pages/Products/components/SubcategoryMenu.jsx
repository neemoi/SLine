import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/SubcategoryMenu.css'; 

function SubcategoryMenu() {
    const { categoryId, subcategoryId } = useParams();
    const [subcategories, setSubcategories] = useState([]);
    const [currentSubcategoryName, setCurrentSubcategoryName] = useState('');

    useEffect(() => {
        const fetchSubcategoriesAndCurrentSubcategoryName = async () => {
            try {
                const response = await fetch(`https://localhost:7036/Catalog/Categories/${categoryId}`);
                const data = await response.json();

                if (data && data.length > 0) {
                    setSubcategories(data); 

                    const currentSubcategory = data.find(subcat => subcat.subcategoryId === parseInt(subcategoryId));
                    if (currentSubcategory) {
                        setCurrentSubcategoryName(currentSubcategory.subcategoryName);
                    }
                }
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        };

        fetchSubcategoriesAndCurrentSubcategoryName();
    }, [categoryId, subcategoryId]);

    return (
        <nav className="subcategory-menu">
            <h2 className="current-subcategory mt-2">{currentSubcategoryName}</h2>
            <ul className="subcategory-list mt-5">
                {subcategories.map(subcategory => (
                    <li key={subcategory.subcategoryId} className={subcategory.subcategoryId === parseInt(subcategoryId) ? 'active' : ''}>
                        <Link to={`/products/${subcategory.subcategoryId}/${categoryId}`} className="subcategory-link">
                            {subcategory.subcategoryName}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default SubcategoryMenu;
