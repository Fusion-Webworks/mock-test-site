import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminDashboard from "./AdminDashboard";
import GuestDashboard from "./GuestDashboard";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [text, setText] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingText, setLoadingText] = useState(false); // Separate loading for text
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return profileError();

        const { data } = await axios.get(
          "https://mocktest-backend-ho52.onrender.com/api/v1/auth/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!data.user) return profileError();
        setUser(data.user);
      } catch (err) {
        console.error("Profile Fetch Error:", err.message);
        profileError();
      } finally {
        setLoadingUser(false);
      }
    };

    getUserProfile();
  }, []);

  useEffect(() => {
    const getText = async () => {
      if (!user?._id) return;
      setLoadingText(true); // Start loading text data
      try {
        const { data } = await axios.get(
          "https://mocktest-backend-ho52.onrender.com/api/v1/adminText/view"
        );
        setText(data.text);
      } catch (error) {
        console.error("Error fetching text:", error);
        toast.error("Failed to fetch text!");
      } finally {
        setLoadingText(false); // Stop loading when done
      }
    };

    getText();
  }, [user?._id]); // Dependency optimized

  const profileError = () => {
    toast.error("Failed to fetch user profile!");
    localStorage.clear();
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const openCardDetails = (item) => {
    navigate(`/card-details/${item._id}`, { state: { item } });
  };

  if (loadingUser)
    return <div className="text-center text-lg font-bold">Loading...</div>;
  
  if (user?.user?.toLowerCase() === "admin") return <AdminDashboard />;
  if (user?.user?.toLowerCase() === "guest") return <GuestDashboard />;
  console.log(user.user)
  const filteredText =
    filter === "All"
      ? text
      : text.filter(
          (item) => item.title.toLowerCase() === filter.toLowerCase()
        );

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
      <div className="flex flex-row">
        <div className="flex flex-col mx-10 gap-4">
          <b>FILTERS:-</b>
          {[
            "All",
            "Mathematics",
            "HCI",
            "CS IT",
            "Business Communications",
            "Programming in C",
          ].map((subject) => (
            <label key={subject} className="cursor-pointer">
              <input
                type="radio"
                name="filter"
                value={subject}
                checked={filter === subject}
                onChange={(e) => setFilter(e.target.value)}
                className="mr-2"
              />
              {subject}
            </label>
          ))}
        </div>

        <div className="flex-1">
          {loadingText ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredText.map((item) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
