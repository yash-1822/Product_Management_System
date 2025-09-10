import { useState, useEffect, useRef, useCallback } from 'react';
import { Filter } from 'lucide-react';
import ProductCard from '../../components/Product/ProductCard.jsx';
import ProductModal from '../../components/Model/ProductModal.jsx';
import { getAllProducts, deleteProduct } from '../../Helpers/ProductApis';
import { useModal } from '../../Context/ModalContext.jsx';
import styles from './ProductListPage.module.css';
import { useNavigate } from 'react-router-dom';
import Skeleton from '../../components/Skeleton/Skeleton';
import Header from '../../components/Header';
import FilterComponent from '../../components/FilterComponent.jsx';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const sidebarRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  const { showModal, editingProduct, openAddModal, openEditModal, closeModal } = useModal();
  const navigate = useNavigate();

  const categories = ["all", "mobile", "earphone", "fridge", "tv", "watch", "camera", "mouse", "printer"];

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(1); // reset to first page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch products from backend
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllProducts({
        page,
        limit: 10,
        search: searchTerm,
        category: selectedCategory === 'all' ? '' : selectedCategory,
        sortBy,
        sortOrder,
      });

      setProducts(res.data);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, selectedCategory, sortBy, sortOrder]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  
  // Delete product
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  // Toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) &&
          !event.target.closest(`.${styles['filter-btn']}`)) {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);


  const renderPagination = () => (
  <div className={styles.pagination}>
    <button
      className="prev-next"
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
    >
      &lt;
    </button>

    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        className={page === i + 1 ? styles.active : ''}
        onClick={() => setPage(i + 1)}
      >
        {i + 1}
      </button>
    ))}

    <button
      className="prev-next"
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
    >
      &gt;
    </button>
  </div>
);


  return (
    <div className={styles['product-list-page']}>
      <Header
        isMobile={isMobile}
        searchTerm={searchInput}
        setSearchTerm={setSearchInput}
        openAddModal={openAddModal}
        toggleSidebar={toggleSidebar}
        logout={logout}
      />

      {isMobile && (
        <div className={styles['mobile-bottom-row']}>
          <button className={styles['filter-btn']} onClick={toggleSidebar}>
            <Filter size={20} /> <span>Filter</span>
          </button>
          <button className={styles['btn-secondary']} onClick={logout}>Logout</button>
        </div>
      )}

      <FilterComponent
        sidebarOpen={sidebarOpen}
        sidebarRef={sidebarRef}
        toggleSidebar={toggleSidebar}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <main className={styles['main-content']}>
        <div className={styles['products-grid']}>
          {products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={() => openEditModal(product)}
              onDelete={() => setDeleteConfirm(product)}
            />
          ))}
        </div>

        {loading && <Skeleton count={isMobile ? 6 : 10} />}

        {!loading && products.length === 0 && (
          <div className={styles['empty-state']}>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}

        {renderPagination()}
      </main>

      {deleteConfirm && (
        <div className={styles['modal-overlay']}>
          <div className={`${styles.modal} ${styles['delete-modal']}`}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete "{deleteConfirm.name}"?</p>
            <div className={styles['modal-actions']}>
              <button className={styles['btn-secondary']} onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className={styles['btn-danger']} onClick={() => handleDelete(deleteConfirm._id)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <ProductModal onClose={closeModal} editingProduct={editingProduct} fetchProducts={fetchProducts} />
      )}
    </div>
  );
};

export default ProductListPage;
