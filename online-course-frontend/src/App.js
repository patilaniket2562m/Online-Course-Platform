import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import MyEnrolledCourses from "./components/MyEnrolledCourses";
import CheckoutPage from "./pages/CheckoutPage";
import Profile from "./pages/Profile";
// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AddCourse from "./components/Admin/AddCourse";
import ManageCourses from "./components/Admin/ManageCourses";
import UsersManagement from "./components/Admin/UsersManagement";
// Additional Pages
import About from "./pages/About";
import { Contact } from "./pages/Contact";
import { Certificates } from "./pages/Certificates";
import { Wishlist } from "./pages/Wishlist";
import { Settings } from "./pages/Settings";
import { Help } from "./pages/Help";
import "./AppLayout.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Top Navigation Bar */}
        <Navbar />

        {/* Sidebar Navigation (shown when logged in) */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User Protected Routes */}
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-courses"
              element={
                <ProtectedRoute>
                  <MyEnrolledCourses />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/certificates"
              element={
                <ProtectedRoute>
                  <Certificates />
                </ProtectedRoute>
              }
            />

            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/help"
              element={
                <ProtectedRoute>
                  <Help />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout/:courseId"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Protected Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/add-course"
              element={
                <AdminRoute>
                  <AddCourse />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/manage-courses"
              element={
                <AdminRoute>
                  <ManageCourses />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UsersManagement />
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
