const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

//To protect routes
const auth = require("../middleware/authMiddleware"); 

// Get all products
router.get("/", productController.getAllProducts);

// Create new product 
router.post("/", auth, productController.createProduct);

// Update product 
router.put("/:id", auth, productController.updateProduct);

// Delete product 
router.delete("/:id", auth, productController.deleteProduct);

router.get("/check",productController.checkToken)

module.exports = router;
