import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
import Fire from "../models/fireBaseUser.js";
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Ensure the SIGNATURE environment variable is set
    const secretKey = process.env.SIGNTURE;
    console.log("Signature environment variable", secretKey);
    if (!secretKey) {
      return res.status(500).json({ message: "JWT secret key not provided" });
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Token verification failed", error: err.message });
      } else {
        req.user = decoded;

        try {
          const userData = await User.findOne({ email: req.user.email }).select(
            { password: 0 }
          );
          console.log(userData);

          req.user = userData;
          req.token = token;
          req.userID = userData._id;

          if (!userData) {
            return res.status(404).json({ message: "User not found" });
          }

          console.log("success auth middleware is verify", userData);
          next();
        } catch (userError) {
          return res.status(500).json({
            message: "Error fetching user data",
            error: userError.message,
          });
        }
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const FireAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Ensure the SIGNATURE environment variable is set
    const secretKey = process.env.SIGNTURE; // Assuming this is the correct variable name
    console.log("Signature environment variable", secretKey);
    if (!secretKey) {
      return res.status(500).json({ message: "JWT secret key not provided" });
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Token verification failed", error: err.message });
      } else {
        req.user = decoded;

        try {
          const userData = await Fire.findOne({ email: req.user.email }).select(
            { password: 0 }
          );

          req.user = userData;
          req.token = token;
          req.userID = userData._id;

          if (!userData) {
            return res.status(404).json({ message: "User not found" });
          }

          console.log("Success FireAuthMiddleware verified", userData);
          next();
        } catch (userError) {
          return res.status(500).json({
            message: "Error fetching user data",
            error: userError.message,
          });
        }
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
