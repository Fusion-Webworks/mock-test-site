import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS

const AdminTextEditor = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [textArea, setTextArea] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Extract the user ID from the token
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated.");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; // Adjust this based on your token structure

      if (!title.trim()) throw new Error("Title is required.");
      const payload = { title, subtitle, textArea, id: userId };

      const response = await axios.post(
        "https://mocktest-backend-ho52.onrender.com/api/v1/adminText/add",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Data saved successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error saving data:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "Failed to save data. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Text Editor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block font-semibold mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter title"
            required
          />
        </div>

        {/* Subtitle Input */}
        <div>
          <label className="block font-semibold mb-2">Subtitle:</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter subtitle"
            required
          />
        </div>

        {/* React-Quill Editor */}
        <div>
          <label className="block font-semibold mb-2">Text Area:</label>
          <ReactQuill
            value={textArea}
            onChange={setTextArea}
            className="bg-white"
            placeholder="Write your text here..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Data
        </button>
      </form>
    </div>
  );
};

export default AdminTextEditor;
