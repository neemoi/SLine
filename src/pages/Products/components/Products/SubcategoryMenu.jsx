import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../styles/SubcategoryMenu.css';

function SubcategoryMenu({ onSearchTermChange }) {
    const { categoryId } = useParams();
    const [categories, setCategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [activeSubcategory, setActiveSubcategory] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://localhost:7036/Catalog/Categories');
                const data = await response.json();
                setCategories(data);

                const currentCategory = data.find(category => category.categoryId === parseInt(categoryId));
                if (currentCategory) {
                    setExpandedCategory(currentCategory.categoryId);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [categoryId]);

    const toggleCategory = (categoryId) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
        setActiveSubcategory(null);
    };

    const toggleSubcategory = (subcategoryId) => {
        setActiveSubcategory(subcategoryId === activeSubcategory ? null : subcategoryId);
    };

    const handleSearchInputChange = (event) => {
        const term = event.target.value;
        setSearchInput(term);
        onSearchTermChange(term);
    };

    return (
        <nav className="subcategory-menu mt-3">
            <div className="search-box">
                <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    placeholder="Введите название товара"
                />
            </div>
            <ul className="category-list mt-4">
                {categories.map(category => (
                    <li key={category.categoryId}>
                        <h2 onClick={() => toggleCategory(category.categoryId)} className={expandedCategory === category.categoryId ? 'active' : ''}>
                            {category.categoryName}
                        </h2>
                        <ul className={`subcategory-list ${expandedCategory === category.categoryId ? 'expanded' : ''}`}>
                            {category.subcategories.map(subcategory => (
                                <li key={subcategory.subcategoryId}>
                                    <Link
                                        to={`/products/${subcategory.subcategoryId}/${category.categoryId}`}
                                        className={`subcategory-link ${activeSubcategory === subcategory.subcategoryId ? 'active' : ''}`}
                                        onClick={() => toggleSubcategory(subcategory.subcategoryId)}
                                    >
                                        {subcategory.subcategoryName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default SubcategoryMenu;