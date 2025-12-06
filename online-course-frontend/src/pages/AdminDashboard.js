import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Get courses count
      const coursesRes = await axios.get("/courses");
      
      // Get users count
      const usersRes = await axios.get("/admin/users");

      setStats({
        totalCourses: coursesRes.data.length,
        totalUsers: usersRes.data.length,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        <i className="bi bi-speedometer2"></i> Admin Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Courses</h5>
              <h2>{stats.totalCourses}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <h2>{stats.totalUsers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">Platform</h5>
              <h2>Active</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="row">
        <div className="col-md-12">
          <h4 className="mb-3">Quick Actions</h4>
          
          <Link 
            to="/admin/add-course" 
            className="btn btn-primary btn-lg me-3 mb-2"
          >
            <i className="bi bi-plus-circle"></i> Add New Course
          </Link>

          <Link 
            to="/admin/manage-courses" 
            className="btn btn-warning btn-lg me-3 mb-2"
          >
            <i className="bi bi-list-ul"></i> Manage Courses
          </Link>

          <Link 
            to="/courses" 
            className="btn btn-info btn-lg text-white mb-2"
          >
            <i className="bi bi-eye"></i> View All Courses
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="alert alert-info">
            <h5>📋 Admin Guide</h5>
            <ul className="mb-0">
              <li><strong>Add Course:</strong> Create new courses with title, description, price, and instructor details</li>
              <li><strong>Manage Courses:</strong> View all courses and delete any course</li>
              <li><strong>View Courses:</strong> See how courses appear to users (without enroll button)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}