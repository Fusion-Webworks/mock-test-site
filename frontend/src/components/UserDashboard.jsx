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
  const [loadingText, setLoadingText] = useState(false);
  const [filter, setFilter] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

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
      setLoadingText(true);
      try {
        const { data } = await axios.get(
          "https://mocktest-backend-ho52.onrender.com/api/v1/adminText/view"
        );
        setText(data.text);
      } catch (error) {
        console.error("Error fetching text:", error);
        toast.error("Failed to fetch text!");
      } finally {
        setLoadingText(false);
      }
    };

    getText();
  }, [user?._id]);

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

  const filteredText =
    filter === "All"
      ? text
      : text.filter(
          (item) => item.title.toLowerCase() === filter.toLowerCase()
        );

  return (
    <div className="relative p-6 min-h-screen">
      {/* Navbar with Hamburger Menu */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">User Dashboard</h1>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? (
              <img src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png" alt="Close" className="w-8 h-8" />
            ) : (
        
              <img src="https://www.svgrepo.com/show/312300/hamburger-menu.svg" alt="Menu" className="w-8 h-8" />
            )}
          </button>
        </div>
        {/* Logout Button (Desktop View) */}
        <button
          onClick={handleLogout}
          className="hidden md:block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-6 bg-white shadow-lg rounded-lg p-4 w-40">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Toggle Button (Mobile) */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="block md:hidden p-2 mb-4 bg-blue-500 text-white rounded-md"
        >
          {isSidebarOpen ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Sidebar Filters */}
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-1/4 lg:w-1/5 bg-gray-100 p-4 rounded-lg shadow-md`}
        >
          <b>FILTERS:</b>
          <div className="flex flex-col gap-2 mt-2">
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
        </div>

        {/* Content Section */}
        <div className="flex-1 ml-0 md:ml-6">
          {loadingText ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
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
