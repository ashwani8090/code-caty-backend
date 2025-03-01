const errorHandler = (err, req, res, next) => {
    const statusCode = err && err.statusCode || 500;
    const message = err && err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      message,
    });
  };
  
  module.exports = errorHandler;