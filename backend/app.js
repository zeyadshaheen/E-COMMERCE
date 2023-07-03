const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cloudinary=require('cloudinary');
const fileUpload=require("express-fileupload");
const bodyParser=require("body-parser");
const cors = require("cors"); // Import the cors middleware
const dotenv=require("dotenv")

app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
app.use(fileUpload());


//CONFIG
dotenv.config({
    path: "backend/config/.env",
  });

//////////////////////////////////////Route imports/////////////////////////////////////////
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const payment = require("./routes/PaymentRoute");

app.use("/api/v2", product);
app.use("/api/v2", user);
app.use("/api/v2", order);
app.use("/api/v2", payment);

// it's for error handling
app.use(ErrorHandler);

module.exports = app;
