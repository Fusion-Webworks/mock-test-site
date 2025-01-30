import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/LogIn.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the CSS for toast notifications
import UserDashboard from "./components/UserDashboard.jsx";
import SignIn from "./components/SignIn.jsx";
import CardDetails from "./components/CardDetails.jsx";

const router = createBrowserRouter([
  { path: "/", element: <UserDashboard /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <SignIn /> },
  { path: "/userDashboard", element: <UserDashboard /> },
  { path: "/adminDashboard", element: <UserDashboard /> },
  { path: "/card-details/:id", element: <CardDetails /> },
]);

const App = () => {
  return (
    <div>
      {/* ToastContainer to display notifications */}
      <ToastContainer />

      {/* RouterProvider to handle routing in the app */}
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
