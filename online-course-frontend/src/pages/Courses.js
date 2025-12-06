import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/authService";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await axios.get("/courses");
      console.log("📌 COURSES FROM BACKEND:", res.data);
      setCourses(res.data);
      setLoading(false);
    } catch (err) {
      alert("Failed to load courses");
      setLoading(false);
    }
  };

  const handleEnroll = (id) => {
    if (!id) {
      alert("Invalid course ID");
      return;
    }
    navigate(`/checkout/${id}`);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="fw-bold mb-2">
            <i className="bi bi-book-fill text-primary me-2"></i>
            Available Courses
          </h2>
          <p className="text-muted">
            Explore our collection of courses and start learning today
          </p>
        </div>
      </div>

      {/* No Courses Message */}
      {courses.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-info text-center py-5">
              <i className="bi bi-info-circle fs-1 d-block mb-3"></i>
              <h4>No Courses Available</h4>
              <p className="mb-0">
                {user && user.role === "ADMIN" 
                  ? "Add your first course from the Admin Panel"
                  : "Check back soon for new courses!"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Course Cards Grid */
        <div className="row g-4">
          {courses.map((course) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={course.id}>
              <div className="card h-100 shadow-sm border-0 hover-card">
                {/* Course Image */}
                <div className="position-relative overflow-hidden" style={{ height: "220px" }}>
                  <img 
                    src={course.imageUrl || "https://via.placeholder.com/400x220/667eea/ffffff?text=Course+Image"} 
                    alt={course.title}
                    className="card-img-top w-100 h-100"
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x220/667eea/ffffff?text=Course+Image";
                    }}
                  />
                  {/* Price Badge */}
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-success fs-6 px-3 py-2 shadow">
                      ₹{course.price}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body d-flex flex-column p-4">
                  {/* Course Title */}
                  <h5 className="card-title fw-bold mb-3" style={{ 
                    minHeight: "60px",
                    fontSize: "1.1rem",
                    lineHeight: "1.4"
                  }}>
                    {course.title}
                  </h5>

                  {/* Course Description */}
                  <p className="card-text text-muted mb-3" style={{
                    minHeight: "72px",
                    fontSize: "0.9rem",
                    lineHeight: "1.6",
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
                    {course.description}
                  </p>

                  {/* Instructor */}
                  {course.instructor && (
                    <div className="d-flex align-items-center mb-3">
                      <i className="bi bi-person-circle text-primary me-2 fs-5"></i>
                      <small className="text-muted">
                        <strong>Instructor:</strong> {course.instructor}
                      </small>
                    </div>
                  )}

                  {/* Spacer to push button to bottom */}
                  <div className="mt-auto">
                    {/* USER Role - Show Enroll Button */}
                    {user && user.role === "USER" && (
                      <button
                        className="btn btn-primary w-100 py-2 fw-semibold"
                        onClick={() => handleEnroll(course.id)}
                      >
                        <i className="bi bi-cart-plus me-2"></i>
                        Enroll Now
                      </button>
                    )}

                    {/* ADMIN Role - Show Info Message */}
                    {user && user.role === "ADMIN" && (
                      <div className="alert alert-info mb-0 py-2 px-3" role="alert">
                        <small>
                          <i className="bi bi-shield-check me-1"></i>
                          <strong>Admin View</strong>
                        </small>
                      </div>
                    )}

                    {/* Not Logged In - Show Login Button */}
                    {!user && (
                      <button
                        className="btn btn-outline-primary w-100 py-2 fw-semibold"
                        onClick={() => navigate("/login")}
                      >
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Login to Enroll
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}