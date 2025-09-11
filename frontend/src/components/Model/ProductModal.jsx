import React, { useState, useEffect, useRef } from 'react';
import { Save, X } from 'lucide-react';
import styles from './ProductModal.module.css';
import UploadImage from '../../Helpers/UploadImage';
import { createProduct, updateProduct } from "../../Helpers/ProductApis";
import { toast } from 'react-toastify'
import imageCompression from 'browser-image-compression';

const ProductModal = ({ onClose, editingProduct, fetchProducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: "select category",
    image: ''
  });

  const [imageError, setImageError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef();
  const modalRef = useRef();

  const MAX_FILE_SIZE_MB = 1; // Now set to 1MB
  const categories = ["select category", "mobile", "earphone", "fridge", "tv", "watch", "camera", "mouse", "printer"];

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        description: editingProduct.description || '',
        price: editingProduct.price || '',
        category: editingProduct.category || 'mobile',
        image: editingProduct.imageUrl || ''
      });
    }
  }, [editingProduct]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) onClose();
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    const priceValue = formData.price?.toString().trim();
    if (!priceValue) newErrors.price = 'Price is required';
    else if (!/^\d+$/.test(priceValue) || parseInt(priceValue) <= 0)
      newErrors.price = 'Price must be a valid positive number';

    if (!formData.image) newErrors.image = 'Please upload an image';
    if (!formData.category || formData.category === "select category")
      newErrors.category = 'Please select a valid category';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const productData = { ...formData, price: parseInt(formData.price, 10) };
      if (editingProduct) await updateProduct(editingProduct._id, productData);
      else await createProduct(productData);

      setShowSuccess(true);
      await fetchProducts();
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1500);
    } catch (error) {
      toast.error("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageError('');
    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file");
      return;
    }


    if (file.size > (MAX_FILE_SIZE_MB * 1024 * 1024)) {
      console.log("Hi BRO");
      setImageError(`File size should not exceed ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    try {
      setUploading(true);
      const options = {
        maxSizeMB: MAX_FILE_SIZE_MB,
        maxWidthOrHeight: 1024,
        useWebWorker: true
      };
      const compressedFile = await imageCompression(file, options);

      if (compressedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {

        setImageError(`Compressed file size should not exceed ${MAX_FILE_SIZE_MB}MB`);
        return;
      }

      const response = await UploadImage(compressedFile);
      if (response.secure_url) {
        setFormData(prev => ({ ...prev, image: response.secure_url }));
        setErrors(prev => ({ ...prev, image: '' }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      console.error("Image compression/upload failed:", error);
      setImageError("Image upload failed, please try again.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => setFormData(prev => ({ ...prev, image: '' }));
  const triggerFileInput = () => fileInputRef.current?.click();

  if (showSuccess) {
    return (
      <div className={styles['modal-overlay']}>
        <div className={`${styles.modal} ${styles['success-modal']}`}>
          <div className={styles['success-icon']}><Save size={48} /></div>
          <h2>Success!</h2>
          <p>Product {editingProduct ? 'updated' : 'created'} successfully</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['modal-overlay']}>
      <div ref={modalRef} className={`${styles.modal} ${styles['product-modal']}`}>
        <div className={styles['modal-header']}>
          <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <button className={styles['close-btn']} onClick={onClose}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className={styles['modal-form']}>
          <div className={styles['form-grid']}>

            <div className={styles['input-group']}>
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                disabled={loading}
              />
              {errors.name && <span className={styles['error-message']}>{errors.name}</span>}
            </div>

            <div className={styles['input-group']}>
              <label htmlFor="price">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                min="0"
                step="1"
                disabled={loading}
              />
              {errors.price && <span className={styles['error-message']}>{errors.price}</span>}
            </div>

            <div className={styles['input-group']}>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={loading}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <span className={styles['error-message']}>{errors.category}</span>}
            </div>

            <div className={styles['input-group']}>
              <label>Product Image *</label>
              <div className={styles['image-upload-area']} onClick={() => !uploading && triggerFileInput()}>
                {uploading ? <p>Uploading...</p> : formData.image ? <p>Uploaded</p> : <p>Click to upload image</p>}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </div>

              {formData.image && (
                <div className={styles['image-preview-container']}>
                  <img src={formData.image} alt="preview" className={styles['image-thumb']} />
                  <button type="button" className={`${styles.btn} ${styles['btn-secondary']}`} onClick={removeImage}>Remove</button>
                </div>
              )}
              {/* {errors.image && <span className={styles['error-message']}>{errors.image}</span>} */}
              {(errors.image || imageError) && (
                <span className={styles['error-message']}>{errors.image || imageError}</span>
              )}
            </div>
          </div>

          <div className={styles['input-group']}>
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your product..."
              rows="4"
              disabled={loading}
            />
            {errors.description && <span className={styles['error-message']}>{errors.description}</span>}
          </div>

          <div className={styles['form-actions']}>
            <button type="button" className={`${styles.btn} ${styles['btn-secondary']}`} onClick={onClose} disabled={loading}>
              <X size={20} /> Cancel
            </button>
            <button type="submit" className={`${styles.btn} ${styles['btn-primary']}`} disabled={loading || uploading}>
              <Save size={20} /> {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
