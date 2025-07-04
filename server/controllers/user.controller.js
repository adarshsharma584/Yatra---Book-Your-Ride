import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const generateAccessandRefreshTokens = async (user) => {
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  return { accessToken, refreshToken };
};

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;

    if (!fullName || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
      phoneNumber,
      role,
    });
    const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
      newUser
    );
    newUser.refreshToken = refreshToken;
    await newUser.save();
    const createdUser = await User.findById(newUser._id).select(
      "-password -refreshToken"
    );
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken);
    console.log("token:", req.cookies);
    console.log("user:", createdUser);
    return res.status(201).json({
      responseData: createdUser,
      accessToken,
      refreshToken,
      message: "User registered successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
      user
    );
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken);

    console.log("token:", req.cookies);
    console.log("user:", user);

    return res.status(200).json({
      responseData: user,
      accessToken,
      refreshToken,
      message: "Login successful",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return next(new errorHandler("User not found", 404));
    }

    user.refreshToken = "";
    await User.updateOne({ _id: user._id }, { refreshToken: "" });

    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "None" });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
 
export const getProfile = async(req,res)=>{
  try {
    const user = req.user;
    const userId = req.user.id;
    if(!userId){
      return res.status(400).json({message:"User id is not found"});
    }
    const userData = await User.findById(userId).select("-password -refreshToken");

    if(!userData){
      return res.status(400).json({message:"User not found"});
    }
    console.log("UserData :", userData);
   
    return res.status(201).json({
      message: "Profile fetched successfully",
      responseData: userData,
    });

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error:error,
      message:"Internal server error"});
  }
}

export const  updateProfile = async (req,res)=>{
  try {
  const {fullName,email,phoneNumber} = req.body;
  if(!fullName || !email || !phoneNumber){
    return res.status(400).json({message:"All fields are required"});
  }
    const userId = req.user.id;
    if(!userId){
      return res.status(400).json({message:"User id is not found"});
    }
    const userData = await User.findByIdAndUpdate({_id:userId},
      {
        fullName,
        email,
        phoneNumber
      },
      {new:true}
    );
    if(!userData){
      return res.status(400).json({message:"User not found"});
    }
    return res.status(201).json({
      message: "Profile updated successfully",
      responseData: userData,
    });
  } catch (error) {
    return res.status(500).json({message:"Internal server error"});
    console.log(error);
  }
};

