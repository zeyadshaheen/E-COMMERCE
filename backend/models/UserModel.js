const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name of yourself"],
    minlength: [3, "Please enter a name atleast 3 characters"],
    maxlength: [15, "Name can not more than 15 Characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your mail"],
    validate: [validator.isEmail, "Please enter a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minlength: [8, "Please enter a Password more than 8 charcters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt:{
    type:Date,
    default:Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

/////////////////////////////////////////Hash Password///////////////////////////////////////////////////
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

/////////////////////////////////////////jwt token for login///////////////////////////////////////////////////
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

/////////////////////////////////////////Compare password///////////////////////////////////////////////////
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/////////////////////////////////////////Forget Password///////////////////////////////////////////////////
userSchema.methods.getResetToken = function () {
  //Genarating Token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //hashing and adding resetPasswordToken to user Schema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordTime = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
