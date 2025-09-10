import React from "react";
import { Filter, SortAsc, SortDesc, X } from "lucide-react";
import styles from "../pages/ProductList/ProductListPage.module.css";

const FilterComponent = ({
    sidebarOpen,
    sidebarRef,
    toggleSidebar,
    selectedCategory,
    setSelectedCategory,
    categories,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
}) => {
    return (
        <div
            className={`${styles["sidebar-overlay"]} ${sidebarOpen ? styles.open : ""
                }`}
        >
            <div
                ref={sidebarRef}
                className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}
            >
                <div className={styles["sidebar-header"]}>
                    <h3>
                        <Filter size={20} /> Filters & Sort
                    </h3>
                    <button
                        className={styles["close-btn"]}
                        onClick={toggleSidebar}
                        aria-label="Close filters"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Category */}
                <div className={styles["filter-section"]}>
                    <h4>Category</h4>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={styles["filter-select"]}
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat === "all" ? "All Categories" : cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort By */}
                <div className={styles["filter-section"]}>
                    <h4>Sort By</h4>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={styles["filter-select"]}
                    >
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="category">Category</option>
                    </select>
                </div>

                {/* Order */}
                <div className={styles["filter-section"]}>
                    <h4>Order</h4>
                    <div className={styles["sort-buttons"]}>
                        <button
                            className={`${styles["sort-btn"]} ${sortOrder === "asc" ? styles.active : ""
                                }`}
                            onClick={() => setSortOrder("asc")}
                        >
                            <SortAsc size={16} /> Ascending
                        </button>
                        <button
                            className={`${styles["sort-btn"]} ${sortOrder === "desc" ? styles.active : ""
                                }`}
                            onClick={() => setSortOrder("desc")}
                        >
                            <SortDesc size={16} /> Descending
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterComponent;
