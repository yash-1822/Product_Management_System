function errorHandler(err, req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack); 
  };

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}

module.exports = errorHandler;
