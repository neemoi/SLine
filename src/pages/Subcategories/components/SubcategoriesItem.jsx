import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SubcategoryNavigarion from './SubcategoryNavigarion.jsx';
import SubcategoriesList from './SubcategoriesList.jsx';

function SubcategoriesItem() {
    const { categoryId } = useParams(); 
    const [subcategories, setSubcategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchSubcategoriesAndCategoryName = async () => {
            try {
                const subcategoriesResponse = await fetch(`https://localhost:7036/Catalog/Categories/${categoryId}`);
                const subcategoriesData = await subcategoriesResponse.json();

                const subcategoriesWithUrls = subcategoriesData.map(subcategory => ({
                    ...subcategory,
                    subcategoryImage: hexToString(subcategory.subcategoryImage)
                }));

                setSubcategories(subcategoriesWithUrls);

                const categoryResponse = await fetch(`https://localhost:7036/Catalog/Categories`);
                const categoriesData = await categoryResponse.json();

                const category = categoriesData.find(cat => cat.categoryId === subcategoriesData[0]?.categoryId);
                if (category) {
                    setCategoryName(category.categoryName);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSubcategoriesAndCategoryName();
        window.scrollTo(0, 0);
    }, [categoryId]);

    const hexToString = hex => {
        const hexString = hex.toString(); 
        let result = '';
        for (let i = 0; i < hexString.length; i += 2) {
            result += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
        }
        return result;
    };

    return (
        <div className="container mt-5">
            <SubcategoryNavigarion categoryName={categoryName} />
            <hr className="mt-1" />
            <SubcategoriesList subcategories={subcategories} categoryId={categoryId}/>
            <div style={{ marginBottom: '600px' }}></div>
        </div>
    );
}

export default SubcategoriesItem;