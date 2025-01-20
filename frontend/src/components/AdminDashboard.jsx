import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminTextEditor from "./AdminTextEditor";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or any other session data
    localStorage.removeItem("token");

    // Show success toast on logout
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="relative p-12">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
      >
        Logout
      </button>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the admin Dashboard</h1>
      </div>
      <AdminTextEditor/>
    </div>
  );
};

export default AdminDashboard;
