import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Product = props => {
    const {product} = props
    const { id, title, price, category, description, image, rating } = product;

  return (
    <li className="product-card">
      <Link to={`/product/${id}`} className="product-card-link">
        <div className="product-image-container">
          <img src={image} alt={title} className="product-image" />
        </div>
        <div className="product-info">
          <span className="product-category">{category}</span>
          <h3 className="product-title">{title}</h3>
          <p className="product-description">{description.substring(0, 100)}...</p>
          <div className="product-footer">
            <span className="product-price">${price.toFixed(2)}</span>
            <span className="product-rating">
              {rating.rate} ★ ({rating.count} reviews)
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Product;