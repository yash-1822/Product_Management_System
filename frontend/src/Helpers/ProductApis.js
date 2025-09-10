import { toast } from "react-toastify";

const API_URL = "http://localhost:8000/api/products";

// Helper to add headers
const getHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};


// Get all products
export const getAllProducts = async ({ page = 1, limit = 10, search = "", category = "", sortBy = "name", sortOrder = "asc" }) => {
  try {
    const params = new URLSearchParams({ page, limit, search, category, sortBy, sortOrder });
    const res = await fetch(`${API_URL}?${params.toString()}`, { headers: getHeaders() });

    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (err) {
    toast.error(err.message);
    throw err;
  }
};



// Create new product
export const createProduct = async (productData) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create product");
    }

    toast.success("Product successfully inserted!");
    return await res.json();
  } catch (err) {
    toast.error(err.message);
    throw err;
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update product");
    }

    toast.success("Product successfully updated!");
    return await res.json();
  } catch (err) {
    toast.error(err.message);
    throw err;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to delete product");
    }

    toast.success("Product successfully deleted!");
    return await res.json();
  } catch (err) {
    toast.error(err.message);
    throw err;
  }
};
