import React from 'react';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-x" onClick={onClose}>&times;</button>
        <div className="modal-layout">
          <div className="modal-img-hold">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="modal-info">
            <h2>{product.title}</h2>
            <span className="category-badge">{product.category}</span>
            <p className="modal-desc">{product.description}</p>
            <div className="modal-footer">
              <span className="modal-price">${product.price.toFixed(2)}</span>
              <button className="buy-now">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;