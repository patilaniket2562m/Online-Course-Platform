import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../api/authService";
import "./Sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  // Navigation items for USER
  const userNavItems = [
    { path: "/", icon: "bi-house-door-fill", label: "Home" },
    { path: "/courses", icon: "bi-book-fill", label: "All Courses" },
    { path: "/my-courses", icon: "bi-collection-play-fill", label: "My Courses" },
    {path: "/wishlist", icon: "bi-heart-fill", label: "Wishlist" },
    {path: "/settings", icon: "bi-gear-fill", label: "Settings" },
    { path: "/certificates", icon: "bi-award-fill", label: "Certificates" },
    { path: "/profile", icon: "bi-person-circle", label: "Profile" },
  ];

  // Navigation items for ADMIN
  const adminNavItems = [
    { path: "/", icon: "bi-house-door-fill", label: "Home" },
    { path: "/admin", icon: "bi-speedometer2", label: "Dashboard" },
    { path: "/admin/add-course", icon: "bi-plus-circle-fill", label: "Add Course" },
    { path: "/admin/manage-courses", icon: "bi-gear-fill", label: "Manage Courses" },
    { path: "/admin/users", icon: "bi-people-fill", label: "Manage Users" },
    { path: "/courses", icon: "bi-eye-fill", label: "View All Courses" },
    { path: "/profile", icon: "bi-person-circle", label: "Profile" },
  ];

  const navItems = user?.role === "ADMIN" ? adminNavItems : userNavItems;

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <button 
        className="hamburger-menu d-lg-none"
        onClick={toggleSidebar}
      >
        <i className="bi bi-list"></i>
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div 
          className="sidebar-overlay d-lg-none"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {/* Logo/Brand */}
        <div className="sidebar-header">
          <button className="toggle-btn" onClick={toggleSidebar}>
            <i className={`bi ${isOpen ? 'bi-chevron-left' : 'bi-chevron-right'}`}></i>
          </button>
          {isOpen && (
            <Link to="/" className="sidebar-brand">
              <i className="bi bi-mortarboard-fill me-2"></i>
              <span>LearnHub</span>
            </Link>
          )}
        </div>

        {/* User Profile Section */}
        {user && (
          <div className="sidebar-profile">
            <div className="profile-avatar">
              <i className="bi bi-person-circle"></i>
            </div>
            {isOpen && (
              <div className="profile-info">
                <h6 className="profile-name">{user.email.split('@')[0]}</h6>
                <span className="profile-role">
                  {user.role === "ADMIN" ? (
                    <><i className="bi bi-shield-fill-check me-1"></i>Admin</>
                  ) : (
                    <><i className="bi bi-person-badge me-1"></i>Student</>
                  )}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          {user ? (
            <>
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`nav-item ${isActive(item.path)}`}
                  title={!isOpen ? item.label : ""}
                >
                  <i className={`bi ${item.icon}`}></i>
                  {isOpen && <span>{item.label}</span>}
                </Link>
              ))}

              {/* Divider */}
              <div className="nav-divider"></div>

              {/* Logout */}
              <button
                className="nav-item logout-btn"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right"></i>
                {isOpen && <span>Logout</span>}
              </button>
            </>
          ) : (
            <>
              {/* Guest Navigation */}
              <Link to="/" className={`nav-item ${isActive("/")}`}>
                <i className="bi bi-house-door-fill"></i>
                {isOpen && <span>Home</span>}
              </Link>
              <Link to="/courses" className={`nav-item ${isActive("/courses")}`}>
                <i className="bi bi-book-fill"></i>
                {isOpen && <span>Browse Courses</span>}
              </Link>
              
              <div className="nav-divider"></div>
              
              <Link to="/login" className={`nav-item ${isActive("/login")}`}>
                <i className="bi bi-box-arrow-in-right"></i>
                {isOpen && <span>Login</span>}
              </Link>
              <Link to="/register" className={`nav-item ${isActive("/register")}`}>
                <i className="bi bi-person-plus-fill"></i>
                {isOpen && <span>Register</span>}
              </Link>
            </>
          )}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="sidebar-footer">
            <small className="text-muted">
              <i className="bi bi-c-circle me-1"></i>
              2025 LearnHub
            </small>
          </div>
        )}
      </div>
    </>
  );
}
