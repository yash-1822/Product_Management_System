const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const errorHandle = require("./src/middleware/errorMiddleware")


require("dotenv").config();
require("./src/db/conn");


//Allow request from all other websites
app.use(cors({
  origin: '*',
}));
app.use(express.json());



//Routes
const userRoutes = require("./src/routes/UserRoutes")
const productRoutes = require("./src/routes/ProductRoutes")


//Use of routes as middleware
app.use('/user',userRoutes);
app.use('/api/products',productRoutes);


//Error handle middleware
app.use(errorHandle);


//Starting server
async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error while starting server:", error);
  }
}

startServer();
