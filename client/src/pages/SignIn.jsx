import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const toastStart = toast.loading("Logging, wait...");
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email: email,
        password: password,
      });
      toast.success("Logged in successfully", { id: toastStart });
      console.log("user", res);
      navigate("/");
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
          Login to Your King Gamling Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-orange-600 transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-primary font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
