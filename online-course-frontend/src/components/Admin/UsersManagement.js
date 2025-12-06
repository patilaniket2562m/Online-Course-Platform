import React, { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import { getCurrentUser } from "../../api/authService";
import "./UsersManagement.css";

export default function UsersManagement() {
  const currentUser = getCurrentUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Create Admin State
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Check if current user is the first admin (ID = 1 or email = aniket1@gmail.com)
  const isFirstAdmin = currentUser?.email === "aniket1@gmail.com";

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/admin/users");
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading users:", error);
      alert("Failed to load users");
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    if (!isFirstAdmin) {
      alert("Only the first admin can create new admin accounts!");
      return;
    }

    if (newAdmin.password !== newAdmin.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (newAdmin.password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    try {
      await axios.post("/auth/register", {
        name: newAdmin.name,
        email: newAdmin.email,
        password: newAdmin.password,
        role: "ADMIN"
      });

      alert("✅ Admin account created successfully!");
      setShowCreateAdmin(false);
      setNewAdmin({ name: "", email: "", password: "", confirmPassword: "" });
      loadUsers();
    } catch (error) {
      console.error("Error creating admin:", error);
      alert("Failed to create admin: " + (error.response?.data || error.message));
    }
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalUsers: users.length,
    admins: users.filter(u => u.role === "ADMIN").length,
    students: users.filter(u => u.role === "USER").length
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-2">
                <i className="bi bi-people-fill text-primary me-2"></i>
                User Management
              </h2>
              <p className="text-muted">Manage all registered users</p>
            </div>
            {isFirstAdmin && (
              <button
                className="btn btn-primary"
                onClick={() => setShowCreateAdmin(!showCreateAdmin)}
              >
                <i className="bi bi-person-plus-fill me-2"></i>
                Create Admin Account
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-people-fill text-primary fs-2 mb-2"></i>
              <h3 className="fw-bold">{stats.totalUsers}</h3>
              <p className="text-muted mb-0">Total Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-shield-fill-check text-warning fs-2 mb-2"></i>
              <h3 className="fw-bold">{stats.admins}</h3>
              <p className="text-muted mb-0">Administrators</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-mortarboard-fill text-success fs-2 mb-2"></i>
              <h3 className="fw-bold">{stats.students}</h3>
              <p className="text-muted mb-0">Students</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Admin Form */}
      {showCreateAdmin && isFirstAdmin && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">
              <i className="bi bi-person-plus me-2"></i>
              Create New Admin Account
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleCreateAdmin}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                    placeholder="Min 6 characters"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirm Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    value={newAdmin.confirmPassword}
                    onChange={(e) => setNewAdmin({...newAdmin, confirmPassword: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  <i className="bi bi-check-circle me-2"></i>
                  Create Admin
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowCreateAdmin(false);
                    setNewAdmin({ name: "", email: "", password: "", confirmPassword: "" });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Enrolled Courses</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <span className="badge bg-secondary">{user.id}</span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div
                            className="user-avatar-small me-2"
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              fontWeight: "bold"
                            }}
                          >
                            {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                          </div>
                          <div>
                            <div className="fw-semibold">{user.name || "N/A"}</div>
                            {user.email === currentUser?.email && (
                              <small className="text-muted">(You)</small>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        {user.role === "ADMIN" ? (
                          <span className="badge bg-warning text-dark">
                            <i className="bi bi-shield-fill-check me-1"></i>
                            Admin
                          </span>
                        ) : (
                          <span className="badge bg-success">
                            <i className="bi bi-person-badge me-1"></i>
                            Student
                          </span>
                        )}
                      </td>
                      <td>
                        <span className="badge bg-primary">
                          {user.enrolledCourses?.length || 0} courses
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => alert(`View details for ${user.name}`)}
                            title="View Details"
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          {user.email !== currentUser?.email && (
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
                                  alert("Delete user functionality coming soon");
                                }
                              }}
                              title="Delete User"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Info Alert */}
      {!isFirstAdmin && (
        <div className="alert alert-info mt-4">
          <i className="bi bi-info-circle me-2"></i>
          <strong>Note:</strong> Only the first admin (aniket1@gmail.com) can create new admin accounts.
        </div>
      )}
    </div>
  );
}