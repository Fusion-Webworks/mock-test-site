import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SignIn = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        user: "guest", // Default value
      });
      

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/v1/auth/register", formData);
      console.log("Registration Successful:", response.data);
      
      toast.success("Registration successful! Please log in.");
    } catch (error) {
      console.error("Registration Failed:", error.response?.data || error.message);
      toast.error("Registration Failed:", error.response?.data || error.message);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-12 h-12">
              <path d="M12 12c2.97 0 5.39-2.42 5.39-5.39 0-2.97-2.42-5.39-5.39-5.39-2.97 0-5.39 2.42-5.39 5.39 0 2.97 2.42 5.39 5.39 5.39zm0 2.02c-4.18 0-12.39 2.11-12.39 6.33v3.63h24v-3.63c0-4.22-8.21-6.33-12.39-6.33z" />
            </svg>
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              name="name" // Changed to match the model
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-3 left-3 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A8 8 0 1017.804 5.12m-5.656 11.172A4 4 0 1116.95 7.05" />
            </svg>
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-3 left-3 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12v4m-8-4v4m4-4v4m0 0h4m-4 0H8" />
            </svg>
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-3 left-3 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 0v4m0-4H8m4 0h4" />
            </svg>
          </div>
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-3 left-3 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 0v4m0-4H8m4 0h4" />
            </svg>
          </div>
         
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            SIGN UP
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
