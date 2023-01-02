const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Interval server error";

  /////////////////////////////////////// Wrong mongodb id Error ///////////////////////////////////////
  if (err.name === "CastError") {
    const message = `Resources not found with this id..Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  /////////////////////////////////////// Duplicate key Error ///////////////////////////////////////
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  /////////////////////////////////////// Wrong JWT Error ///////////////////////////////////////
  if (err.name === "jsonWebTokenError") {
    const message = `Your url is invalid Please try again `;
    err = new ErrorHandler(message, 400);
  }

  /////////////////////////////////////// Expired JWT Error ///////////////////////////////////////
  if (err.name === "TokenExpiredError") {
    const message = `Your url is Expired Please try again `;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
