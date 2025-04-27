import './index.css';
import '../Home/index.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductsView = () => {
    const { id } = useParams();
    const [details, setterFun] = useState(null);
    const [loading, setLoading] = useState(true);

    const getInfoFun = async () => {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await res.json();
            setterFun(data);
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getInfoFun();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>  
            </div>
        );
    }

    if (!details) {
        return <div className="error-message">Product not found</div>;
    }

    const { title, price, category, description, image, rating } = details;

    return (
        <div className="product-view-container">
            <div className="product-view">
                <div className="product-image-container">
                    <img src={image} alt={title} className="product-view-image" />
                </div>
                <div className="product-details">
                    <h1 className="product-title">{title}</h1>
                    <p className="product-category"><span>Category:</span> {category}</p>
                    <div className="product-description">
                        <h3>Description</h3>
                        <p>{description}</p>
                    </div>
                    <div className="product-meta">
                        <p className="product-price"><span>Price:</span> ${price.toFixed(2)}</p>
                        <p className="product-rating">
                            <span>Rating:</span> 
                            <span className="rating-stars">{"★".repeat(Math.round(rating?.rate))}</span>
                            ({rating?.rate}/5 from {rating?.count} reviews)
                        </p>
                    </div>
                    <button className="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductsView;
