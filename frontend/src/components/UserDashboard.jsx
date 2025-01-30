import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminDashboard from "./AdminDashboard";
import GuestDashboard from "./GuestDashboard";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // Start as null for proper loading check
  const [text, setText] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All"); // Default filter is "All"

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
      } catch (err) {
        profileError();
        err.message();
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
if(user?.user === "guest") return <GuestDashboard />;
  // Filter the text array based on the selected filter
  const filteredText =
    filter === "All"
      ? text
      : text.filter((item) => item.title.toLowerCase() === filter.toLowerCase());

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
          {/* Radio buttons for filtering */}
          {["All", "Mathematics", "HCI", "CS IT", "Buisness Comunications", "Programming in C"].map(
            (subject) => (
              
              <div key={subject}>
               
                <label>
                  <input
                    type="radio"
                    name="filter"
                    value={subject}
                    checked={filter === subject} // Set the checked status
                    onChange={(e) => setFilter(e.target.value)} // Set the selected filter value
                    className="mr-2"
                  />
                  {subject}
                </label>
              </div>
            )
          )}
        </div>
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
      </div>
    </div>
  );
};

export default UserDashboard;
