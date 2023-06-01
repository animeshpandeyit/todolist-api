import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (user) {
    return res.status(404).json({
      success: false,
      message: `User ${user.name} already registered`,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  // res
  //   .status(201)
  //   .cookie("token", token, {
  //     httpOnly: true,
  //     maxAge: 15 * 60 * 1000,
  //   })
  //   .json({
  //     success: true,
  //     message: " Registration successful",
  //   });

  sendCookie(user, res, "Registration successful", 201);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Email or Password does not match",
    });
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message: `welcome back to ${user.name}`,
    });
};

export const getallUsers = async (req, res) => {
  const users = await User.find({});
  // const keywords = req.query;
  // console.log(keywords);
  res.json({
    success: true,
    users: users,
  });
};

export const getUserByID = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  console.log(req.params);
  res.status(200).json({
    success: true,
    message: `User ${user.name} has been successfully found`,
    user: user,
  });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const updateUser = await User.findByIdAndUpdate(
    id,
    { name: name, email: email },
    { new: true }
  );
  res.json({
    success: true,
    message: " User updated successfully",
    user: updateUser,
  });
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(403).json({
      success: false,
      message: `User ${email} is not authorized/found`,
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password == hashedPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: `User ${email} has successfully updated Password`,
    // user: user,
  });
};

// export const getUserByID = async (req, res) => {
//   const { id } = req.query;
//   const user = await User.findById(id);
//   res.status(200).json({
//     success: true,
//     message: `User ${user.name} has been successfully found`,
//     user: user,
//   });
// };
export const getMyProfile = (req, res) => {
  // const { token } = req.cookies;
  // if (!token) {
  //   res.status(401).json({ success: false, message: "login first!!" });
  // }
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // const user = await User.findById(decoded._id);
  res.status(200).json({
    success: true,
    // message: `Successfully found ${user.name} profile `,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: `Logged out`,
    });
};
