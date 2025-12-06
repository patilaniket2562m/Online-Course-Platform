import React, { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null); // Track which course is being deleted
  const navigate = useNavigate();

  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/courses");
      setCourses(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading courses:", error);
      setLoading(false);
      alert("Failed to load courses. Please try again.");
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const deleteCourse = async (id) => {
    // Confirm before deleting
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?\n\nThis action cannot be undone and will remove all enrollments."
    );
    
    if (!confirmed) {
      return;
    }

    try {
      setDeleting(id); // Show loading state for this course
      
      console.log("Attempting to delete course with ID:", id);
      
      // Try the delete request
      const response = await axios.delete(`/admin/delete-course/${id}`);
      
      console.log("Delete response:", response);
      
      // Success notification
      alert("✅ Course deleted successfully!");
      
      // Reload courses
      await loadCourses();
      
    } catch (error) {
      console.error("Error deleting course:", error);
      
      // More detailed error handling
      if (error.response) {
        // Server responded with error
        console.error("Server error:", error.response.data);
        console.error("Status code:", error.response.status);
        
        if (error.response.status === 403) {
          alert("❌ Access Denied: You don't have permission to delete courses.\n\nPlease make sure you're logged in as an admin.");
        } else if (error.response.status === 404) {
          alert("❌ Course not found. It may have been already deleted.");
          loadCourses(); // Refresh the list
        } else {
          alert(`❌ Failed to delete course: ${error.response.data || 'Unknown error'}`);
        }
      } else if (error.request) {
        // Request made but no response
        console.error("No response received:", error.request);
        alert("❌ Network error: Could not connect to server.\n\nPlease check your connection and try again.");
      } else {
        // Something else went wrong
        console.error("Error:", error.message);
        alert(`❌ Error: ${error.message}`);
      }
    } finally {
      setDeleting(null); // Reset deleting state
    }
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
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-2">
                <i className="bi bi-gear-fill text-warning me-2"></i>
                Manage Courses
              </h2>
              <p className="text-muted">
                Total Courses: <strong>{courses.length}</strong>
              </p>
            </div>
            <div>
              <button 
                className="btn btn-primary me-2"
                onClick={() => navigate("/admin/add-course")}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Add New Course
              </button>
              <button 
                className="btn btn-outline-secondary"
                onClick={() => navigate("/admin")}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* No Courses Message */}
      {courses.length === 0 ? (
        <div className="alert alert-info text-center py-5">
          <i className="bi bi-inbox fs-1 d-block mb-3"></i>
          <h4>No Courses Available</h4>
          <p className="mb-4">Start by adding your first course!</p>
          <button 
            className="btn btn-primary px-4"
            onClick={() => navigate("/admin/add-course")}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Course
          </button>
        </div>
      ) : (
        /* Courses Grid */
        <div className="row g-4">
          {courses.map((course) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={course.id}>
              <div className="card h-100 shadow-sm border-0">
                {/* Course Image */}
                <div className="position-relative" style={{ height: "200px", overflow: "hidden" }}>
                  <img 
                    src={course.imageUrl || "https://via.placeholder.com/400x200/ffc107/000000?text=Course"} 
                    alt={course.title}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x200/ffc107/000000?text=Course";
                    }}
                  />
                  {/* Admin Badge */}
                  <div className="position-absolute top-0 start-0 m-2">
                    <span className="badge bg-warning text-dark">
                      <i className="bi bi-shield-check me-1"></i>
                      Admin
                    </span>
                  </div>
                  {/* Course ID Badge */}
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-dark">ID: {course.id}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body d-flex flex-column p-3">
                  {/* Title */}
                  <h5 className="card-title fw-bold mb-2" style={{ 
                    minHeight: "50px",
                    fontSize: "1rem"
                  }}>
                    {course.title}
                  </h5>

                  {/* Description */}
                  <p className="card-text text-muted small mb-3" style={{
                    minHeight: "60px",
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
                    {course.description}
                  </p>

                  {/* Course Info */}
                  <div className="mb-3">
                    {course.instructor && (
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-person-circle text-primary me-2"></i>
                        <small className="text-muted">{course.instructor}</small>
                      </div>
                    )}
                    <div className="d-flex align-items-center">
                      <i className="bi bi-tag-fill text-success me-2"></i>
                      <strong className="text-success">₹{course.price}</strong>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto">
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => alert("Edit feature coming soon!")}
                      >
                        <i className="bi bi-pencil-square me-2"></i>
                        Edit Course
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteCourse(course.id)}
                        disabled={deleting === course.id}
                      >
                        {deleting === course.id ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-trash-fill me-2"></i>
                            Delete Course
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statistics Footer */}
      {courses.length > 0 && (
        <div className="row mt-5">
          <div className="col-12">
            <div className="card bg-light border-0">
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-md-4">
                    <i className="bi bi-book-fill text-primary fs-2 d-block mb-2"></i>
                    <h4 className="fw-bold">{courses.length}</h4>
                    <p className="text-muted mb-0">Total Courses</p>
                  </div>
                  <div className="col-md-4">
                    <i className="bi bi-currency-rupee text-success fs-2 d-block mb-2"></i>
                    <h4 className="fw-bold">
                      ₹{courses.reduce((sum, course) => sum + course.price, 0).toFixed(2)}
                    </h4>
                    <p className="text-muted mb-0">Total Value</p>
                  </div>
                  <div className="col-md-4">
                    <i className="bi bi-graph-up text-info fs-2 d-block mb-2"></i>
                    <h4 className="fw-bold">
                      ₹{(courses.reduce((sum, course) => sum + course.price, 0) / courses.length).toFixed(2)}
                    </h4>
                    <p className="text-muted mb-0">Average Price</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}