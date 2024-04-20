import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/SubcategoriesCard.css'; 

function SubcategoriesCards() {
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

    const splitIntoRows = (arr, size) => {
        const rows = [];
        for (let i = 0; i < arr.length; i += size) {
            rows.push(arr.slice(i, i + size));
        }
        return rows;
    };

    return (
        <div className="container" style={{ paddingTop: '50px', minHeight: 'calc(100vh - 200px)' }}>
            <div className="mt-1 d-flex align-items-center">
                <Link to="/" className="btn btn-link">Главная страница</Link>
                <span className="mx-3">{'>'}</span>
                <span>{categoryName}</span>
            </div>
            <hr className="mt-1" />
            <div className="container mt-5" id="all-subcategories">
                {splitIntoRows(subcategories, 4).map((row, index) => (
                    <div className="row row-cols-1 g-3 justify-content-center" key={index}>
                        {row.map(subcategory => (
                            <div key={subcategory.subcategoryId} className="col-md-3 mb-3">
                                <Link to={`/products/${subcategory.subcategoryId}`}>
                                    <div className="card">
                                        <img src={subcategory.subcategoryImage} className="card-img-top" alt={subcategory.subcategoryName} />
                                        <div className="card-img-overlay">
                                            <p className="card-text">{subcategory.subcategoryName}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SubcategoriesCards;
