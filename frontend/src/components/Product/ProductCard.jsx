import React from 'react';
import { Edit2, Trash2, Tag, DollarSign } from 'lucide-react';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className={styles['product-card']}>

      {/* DeleteButton */}
      <button
        className={styles['delete-btn']}
        onClick={onDelete}
        aria-label="Delete product"
      >
        <Trash2 size={18} />
      </button>


      {/* productImage*/}
      <div className={styles['product-image']}>
        <img
          src={
            product.imageUrl ||
            'https://images.pexels.com/photos/441794/pexels-photo-441794.jpeg?auto=compress&cs=tinysrgb&w=400'
          }
          alt={product.name}
          onError={(e) => {
            e.target.src =
              'https://images.pexels.com/photos/441794/pexels-photo-441794.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        <div className={styles['image-overlay']}></div>
      </div>


      {/* productDetails */}
      <div className={styles['product-info']}>
        <div className={styles['product-header']}>
          <div className={styles['category-badge']}>
            <Tag size={12} />
            {product.category}
          </div>
          <button
            className={styles['edit-btn']}
            onClick={onEdit}
            aria-label="Edit product"
          >
            <Edit2 size={14} />
          </button>
        </div>

        <h3 className={styles['product-name']}>{product.name}</h3>
        <p className={styles['product-description']}>{product.description}</p>

        <div className={styles['product-price']}>
          <DollarSign size={16} />
          <span className={styles['price-value']}>{product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
