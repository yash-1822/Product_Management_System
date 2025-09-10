// src/components/Header/Header.jsx
import React from "react";
import { Search, Plus, Filter } from "lucide-react";
import styles from "../pages/ProductList/ProductListPage.module.css";

const Header = ({
    isMobile,
    searchTerm,
    setSearchTerm,
    openAddModal,
    toggleSidebar,
    logout,
}) => {
    return (
        <header className={styles.header}>

            {/* Desktop / Tablet Header */}
            {!isMobile && (
                <>
                    <button
                        className={styles["filter-btn"]}
                        onClick={toggleSidebar}
                        aria-label="Toggle filters"
                    >
                        <Filter size={24} />
                        <span className={styles["filter-text"]}>Filter</span>
                    </button>

                    {/* Search */}
                    <div className={styles["search-container"]}>
                        <div className={styles["search-box"]}>
                            <Search className={styles["search-icon"]} size={20} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles["search-input"]}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className={styles["header-actions"]}>
                        <button
                            className={styles["btn-primary"]}
                            onClick={openAddModal}
                        >
                            <Plus size={20} />Add Product
                        </button>
                        <button className={styles["logout-btn"]} onClick={logout}>
                            Logout
                        </button>
                    </div>
                </>
            )}

            {/* Mobile Header */}
            {isMobile && (
                <div className={styles["mobile-header"]}>
                    <div className={styles["mobile-top-row"]}>
                        <div className={styles["search-container"]}>
                            <div className={styles["search-box"]}>
                                <Search className={styles["search-icon"]} size={20} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={styles["search-input"]}
                                />
                            </div>
                        </div>

                        <button
                            className={styles["btn-primary"]}
                            onClick={openAddModal}
                        >
                            <Plus size={20} />AddProduct
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;




