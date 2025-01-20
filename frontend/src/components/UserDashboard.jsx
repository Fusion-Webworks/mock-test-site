import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminDashboard from "./AdminDashboard";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // Start as null for proper loading check
  const [text, setText] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user profile
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        if (!localStorage.getItem("token")) {
          profileError();
          return;
        }
        const response = await axios.get(
          "http://localhost:3000/api/v1/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const userData = response.data.user;
        if (!userData) {
          profileError();
          return;
        }
        setUser(userData);
      } catch (error) {
        profileError();
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  // Fetch admin text based on the user
  useEffect(() => {
    const getText = async () => {
      if (!user?._id) return;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/adminText/view`
        );
        setText(response.data.text);
      } catch (error) {
        console.error("Error fetching text:", error);
        toast.error("Failed to fetch text!");
      }
    };

    getText();
  }, [user]);

  const profileError = () => {
    toast.error("Failed to fetch user profile!");
    navigate("/login");
    localStorage.clear();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const openCardDetails = (item) => {
    navigate(`/card-details/${item._id}`, { state: { item } });
  };

  if (loading) return <div>Loading...</div>;

  if (user?.user === "admin") return <AdminDashboard />;

  return (
    <div className="relative p-12">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
      >
        Logout
      </button>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to the User Dashboard
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {text.map((item) => (
          <div
            key={item._id}
            className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => openCardDetails(item)}
          >
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <h3 className="text-md font-semibold mb-1 text-gray-600">
              {item.subtitle}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
