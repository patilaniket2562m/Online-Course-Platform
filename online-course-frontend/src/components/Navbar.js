import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../api/authService";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="top-navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand-section">
          <Link to="/" className="navbar-logo">
            <i className="bi bi-mortarboard-fill me-2"></i>
            <span className="brand-name">LearnHub</span>
          </Link>
        </div>

        {/* Public Navigation Links - ALWAYS VISIBLE */}
        <div className="navbar-public-links">
          <Link to="/" className="nav-link">
            <i className="bi bi-house-door me-1"></i>
            Home
          </Link>
          <Link to="/about" className="nav-link">
            <i className="bi bi-info-circle me-1"></i>
            About
          </Link>
          <Link to="/contact" className="nav-link">
            <i className="bi bi-envelope me-1"></i>
            Contact
          </Link>
          <Link to="/courses" className="nav-link">
            <i className="bi bi-book me-1"></i>
            Courses
          </Link>
        </div>

        {/* Search Bar */}
        <div className="navbar-search">
          <div className="search-box">
            <i className="bi bi-search"></i>
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="search-input"
            />
          </div>
        </div>

        {/* Right Side - User Menu or Login */}
        <div className="navbar-right">
          {user ? (
            <>
              {/* Notifications */}
              <button className="icon-btn" title="Notifications">
                <i className="bi bi-bell"></i>
                <span className="notification-badge">3</span>
              </button>

              {/* Messages */}
              <button className="icon-btn" title="Messages">
                <i className="bi bi-chat-dots"></i>
                <span className="notification-badge">5</span>
              </button>

              {/* User Dropdown */}
              <div className="user-menu">
                <button 
                  className="user-menu-btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="user-avatar">
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <div className="user-info">
                    <span className="user-name">
                      {user.email.split('@')[0]}
                    </span>
                    <span className="user-role">
                      {user.role === "ADMIN" ? "Administrator" : "Student"}
                    </span>
                  </div>
                  <i className={`bi bi-chevron-${showDropdown ? 'up' : 'down'} ms-2`}></i>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                      <i className="bi bi-person"></i>
                      <span>Profile</span>
                    </Link>
                    
                    {user.role === "USER" && (
                      <>
                        <Link to="/my-courses" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                          <i className="bi bi-collection-play"></i>
                          <span>My Courses</span>
                        </Link>
                        <Link to="/certificates" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                          <i className="bi bi-award"></i>
                          <span>Certificates</span>
                        </Link>
                        <Link to="/wishlist" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                          <i className="bi bi-heart"></i>
                          <span>Wishlist</span>
                        </Link>
                      </>
                    )}

                    {user.role === "ADMIN" && (
                      <>
                        <Link to="/admin" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                          <i className="bi bi-speedometer2"></i>
                          <span>Dashboard</span>
                        </Link>
                        <Link to="/admin/manage-courses" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                          <i className="bi bi-gear"></i>
                          <span>Manage Courses</span>
                        </Link>
                        <Link to="/admin/users" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                          <i className="bi bi-people"></i>
                          <span>Manage Users</span>
                        </Link>
                      </>
                    )}

                    <div className="dropdown-divider"></div>
                    
                    <Link to="/settings" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                      <i className="bi bi-gear-fill"></i>
                      <span>Settings</span>
                    </Link>
                    
                    <Link to="/help" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                      <i className="bi bi-question-circle"></i>
                      <span>Help</span>
                    </Link>

                    <div className="dropdown-divider"></div>

                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Login/Register Buttons for Guests */
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login
              </Link>
              <Link to="/register" className="btn-register">
                <i className="bi bi-person-plus me-2"></i>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}