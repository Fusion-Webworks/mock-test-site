import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mocktest-backend-ho52.onrender.com/api/v1/auth/login",
        formData
      );
      toast.success("Login successful!");
      // Assuming the token is returned in the response
      localStorage.setItem("token", response.data.token);
      console.log(response);
      navigate("/userDashboard");
    } catch (error) {
      toast.error("Login failed. Invalid credentials.");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Dont have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Sign Up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
