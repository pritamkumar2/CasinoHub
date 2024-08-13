import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const fireSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

fireSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this.username.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.SIGNTURE,
      {
        expiresIn: "30d",
      }
    );
  } catch (e) {
    console.log("error from jwt Fire model", e);
  }
};

const Fire = mongoose.model("FireBase", fireSchema);

export default Fire;
