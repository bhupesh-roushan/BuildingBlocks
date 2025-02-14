import { User } from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//for registering the user
export const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;

  // check if role is valid
  if (!["instructor", "user"].includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role, must be either 'instructor' or 'user'.",
    });
  }

  //if the user already exists
  const exisitingUser = await User.findOne({
    $or: [{ userEmail }, { userName }],
  });
  if (exisitingUser) {
    return res.status(400).json({
      success: false,
      message: "User Name or Email already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  //create a new user
  const newUser = new User({
    userName,
    userEmail,
    password: hashPassword,
    role: req?.body?.role,
  });
  await newUser.save();

  res.status(201).json({
    success: true,
    message: "User Registered Successfully!",
  });
};

// for logging in the user
export const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;
  const checkUser = await User.findOne({ userEmail });

  //if the user does not exist
  if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  //if the user exists and the password is correct then generate a token
  const accessToken = jwt.sign(
    {
      _id: checkUser._id,
      userName: checkUser.userName,
      userEmail: checkUser.userEmail,
      role: checkUser.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "5h" }
  );

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      user: {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: checkUser.role,
      },
    },
  });
};
