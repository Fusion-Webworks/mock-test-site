import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GuestDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Admin-provided data
  const [loading, setLoading] = useState(true);

  // Fetch admin-provided data
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          "https://mocktest-backend-ho52.onrender.com/api/v1/adminText/view"
        );
        setData(response.data.text);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        toast.error("Failed to load data!");
        data;
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative p-12">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
      >
        Logout
      </button>
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome, Guest!</h1>
      <p className="text-center text-gray-700 mb-8">
        You do not have admin access, but here’s some shared information.
      </p>
    </div>
  );
};

export default GuestDashboard;
