const product = require("../models/Product")
const { default: AppError } = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

const getAllProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const sortBy = req.query.sortBy || "name";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (category && category !== "all") filter.category = category;

    const total = await product.countDocuments(filter);

    const Products = await product.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: Products,
    });
  } catch (err) {
    next(err);
  }
};



//Inserting new product
const createProduct = async (req, res, next) => {
    try {
        const { name, price, category, description, image } = req.body;
        console.log(req.body);

        // Validation
        if (!name || !price || !category || !description || !image) {
            return next(new AppError("All fields are required", 400));
        }

        if (price < 0) {
            return next(new AppError("Price cannot be negative", 400));
        }

        const allowedCategories = ["mobile", "earphone", "fridge", "tv","watch","camera","mouse","printer"];
        if (!allowedCategories.includes(category)) {
            return next(
                new AppError(
                    `Invalid category. Allowed values: ${allowedCategories.join(", ")}`,
                    400
                )
            );
        }

        const Product = await product.create({
            name,
            price,
            category,
            description,
            imageUrl:image,
        });

        res.status(201).json({
            success: true,
            data: Product,
        });
    } catch (err) {
        next(err);
    }
};


//For Updatation of product details
const updateProduct = async (req, res, next) => {
    try {
        console.log("update detailas are:",req.body);
        const { name, price, category, description, image } = req.body;

        // Validation
        if (!name || !price || !category || !description || !image) {
            return next(new AppError("All fields are required", 400));
        }

        const numericPrice = parseFloat(price);
        if (numericPrice < 0) {
            return next(new AppError("Price cannot be negative", 400));
        }

         const allowedCategories = ["mobile", "earphone", "fridge", "tv","watch","camera","mouse","printer"];
        if (!allowedCategories.includes(category)) {
            return next(
                new AppError(
                    `Invalid category. Allowed values: ${allowedCategories.join(", ")}`,
                    400
                )
            );
        }

        const Product = await product.findByIdAndUpdate(
            req.params.id,
            { name, price, category, description, imageUrl:image },
            { new: true, runValidators: true }
        );

        if (!Product) {
            return next(new AppError("Product not found", 404));
        }

        res.status(200).json({
            success: true,
            data: Product,
        });
    } catch (err) {
        next(err);
    }
};


const deleteProduct = async (req, res, next) => {
  try {
    const Product = await product.findByIdAndDelete(req.params.id);

    if (!Product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};



const checkToken = (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ valid: false, message: "No token provided" });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ valid: false, message: "Token missing" });
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY); 
    return res.json({ valid: true });
  } catch (err) {
    return res.status(401).json({ valid: false, message: "Invalid or expired token" });
  }
};




module.exports = {getAllProducts, createProduct, updateProduct,deleteProduct,checkToken};

