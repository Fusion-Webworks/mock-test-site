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

  if (loading) return <div className="flex justify-center items-center h-40">
  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
</div>;

  return (
    <div className="relative p-12">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
      >
        Logout
      </button>
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome, Guest!</h1>

      <p className="text-center flex justify-center text-gray-700 mb-8">
        You do  <p className="text-red-500 px-1"> not </p>  have admin access, but here’s some shared information.
      </p>

<div className="flex justify-center text-center">
<div className="border justify-center w-1/2 items-center border-black p-6 shadow-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold">Basic Plan</h3>
            <p className="text-lg my-3">Access to all mock tests</p>
            <p title="Section A: Case-Based Questions
(2 Questions × 7.5 Marks = 15 Marks)
Section B: Descriptive Questions
(2 Questions × 7.5 Marks = 15 Marks)
Section C: Multiple Choice Questions
(40 Questions × 1 Mark = 40 Marks)

" className="text-lg my-3">All mock test of updated exam pattern</p>
            <p className=" flex  justify-center text-lg my-3">You will get <p className="text-red-500 px-1"> 50 </p> Mock test</p>
            <p className="text-lg my-3">1-1 for all modules and 5-5 as complete mock test of each subject</p>

            <p className="text-xl font-semibold text-green-600"><span className="text-red-800">only in </span>₹100</p>
            <button
  onClick={() => {
    const phoneNumber = "9259756979"; // Admin's WhatsApp number
    const message = encodeURIComponent(
      "Hello Admin, I need assistance regarding the mock tests." +
      " My Email is:"
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  }}
  className="mt-4 bg-red-600 text-white px-6 py-2 text-lg font-medium hover:bg-red-700 transition"
>
  Message to Admin
</button>

          </div>
</div>

    
      <span className=" my-10 mr-20 flex flex-col  text-center"><p className="text-red-500">connect with admin on:</p>
         <h2>Whatsapp: <span className="text-green-500">9259756979</span>---most preferable</h2>
         <h2>Discord: <span className="text-green-500">@yogesh_71420</span></h2>
         <p>note: please send your email address by which you are logging in this site.</p>
         </span>



<div className="border my-10">
  <div className=" m-10 mb-10" >
         <h1 className="text-3xl">how much you get:</h1>
         <img className="p-10  bg-gray-100 rounded-lg " src="https://i.imgur.com/HTvFKmw.png" alt="" />
         </div>
         <hr />
  <div className="">
         <h1 className="text-3xl">what you get:</h1>
         <img className="p-10  bg-gray-100 rounded-lg " src="https://i.imgur.com/QM2g88x.png" alt="" />
         </div>
         <hr />
  <div className="">
         <h1 className="text-3xl">What content (formate) you get:</h1>
<video className="p-10  bg-gray-100 rounded-lg " autoPlay controls loop src="https://i.imgur.com/nh0l2ns.mp4"></video>         </div>

         </div>
    </div>
  );
};

export default GuestDashboard;
