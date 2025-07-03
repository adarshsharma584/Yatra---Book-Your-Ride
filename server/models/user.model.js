import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "driver", "admin"],
      default: "user",
    },
    location: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
   
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

mongoose.methods.generateAccessToken = function () {
  return jwt.sign({
    id: this._id,
    role: this.role,
    fullName: this.fullName,
    email: this.email,
    phoneNumber: this.phoneNumber,
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};

mongoose.methods.generateRefreshToken = function () {
  return jwt.sign({
    id: this._id,
    role: this.role,
   
  }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};

const User = mongoose.model("User", userSchema);
export default User;
