import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOTPEnable, setIsOtpEnable] = useState(false);
  const navigate = useNavigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastStart = toast.loading("Creating, wait...");
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", {
        username: username,
        email: email,
        password: password,
      });
      //   if (res.response.status === 400) {
      //     toast.error("Email already in use", { id: toastStart });
      //   }
      toast.success("user created successfully", { id: toastStart });
      console.log("user", res);
      // setIsOtpEnable(true);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, Plese try again", {
        id: toastStart,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6 animate-fadeIn">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Create Your King Gamling Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="********"
              required
            />
          </div>
          {/* {isOTPEnable && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <input
                type="password"
                id="password"
                //  value={OTP}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter your OTP"
                required
              />
            </div>
          )} */}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-orange-600 transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to={"/signin"} className="text-primary font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
