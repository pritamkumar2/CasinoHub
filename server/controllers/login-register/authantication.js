import User from "../../models/user-model.js";
import sendEmail from "../Nodemailer/sendEmail.js";
import bcrypt from "bcrypt";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);
    const otp = generateOTP(); // Generate OTP

    const newUser = new User({
      username: username,
      email: email,
      password: hash_password,
      otp, // Save the OTP
      isVerified: false, // Add a field to track verification status
    });

    await newUser.save();

    // Send OTP email
    await sendEmail(email, "Email Verification", `Your OTP is ${otp}`);

    return res.status(201).json({
      message: "User registered successfully. Please check your email for OTP.",
      user: newUser._id.toString(),
    });
  } catch (e) {
    console.error("Error from register route", e);
    return res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }

    res.status(200).json({
      success: true,
      message: "User login successfully",
      token: await user.generateToken(),
      user: user._id.toString(),
    });
  } catch (err) {
    console.error("Error from login route", err);
    res.status(500).send("Internal Server Error");
  }
};

const forget = (req, res) => {
  try {
    res.status(200).send("Welcome to forget world!");
  } catch (e) {
    console.error("Error from forget route", e);
    res.status(500).send("Error from forget route");
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = null; // Clear the OTP after successful verification
    await user.save();

    res.status(200).json({
      message: "Email verified successfully",
      token: await user.generateToken(),
    });
  } catch (err) {
    console.error("Error from verifyOtp route", err);
    res.status(500).send("Internal Server Error");
  }
};

export { login, register, forget, verifyOtp };
