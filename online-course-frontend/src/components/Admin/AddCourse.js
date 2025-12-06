import React, { useState } from "react";
import axios from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    instructor: "",
    imageUrl: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.title || !form.description || !form.price) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      // Convert price to number
      const courseData = {
        ...form,
        price: parseFloat(form.price)
      };

      await axios.post("/admin/add-course", courseData);
      alert("Course Added Successfully!");
      navigate("/admin/manage-courses");
    } catch (error) {
      console.error("Error adding course:", error);
      
      if (error.response?.status === 403) {
        alert("Forbidden: Only admins can add courses");
      } else {
        alert("Failed to add course: " + (error.response?.data || error.message));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">
                <i className="bi bi-plus-circle"></i> Add New Course
              </h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                
                {/* Course Title */}
                <div className="mb-3">
                  <label className="form-label">
                    Course Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="e.g., Complete Java Programming"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="Describe what students will learn..."
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    required
                  />
                </div>

                {/* Price */}
                <div className="mb-3">
                  <label className="form-label">
                    Price (₹) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="price"
                    placeholder="e.g., 2999"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Instructor */}
                <div className="mb-3">
                  <label className="form-label">Instructor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="instructor"
                    placeholder="e.g., John Doe"
                    value={form.instructor}
                    onChange={handleChange}
                  />
                </div>

                {/* Image URL */}
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={form.imageUrl}
                    onChange={handleChange}
                  />
                  <small className="form-text text-muted">
                    Optional: Provide a URL to an image for the course
                  </small>
                </div>

                {/* Image Preview */}
                {form.imageUrl && (
                  <div className="mb-3">
                    <label className="form-label">Image Preview:</label>
                    <div>
                      <img 
                        src={form.imageUrl} 
                        alt="Course preview"
                        className="img-thumbnail"
                        style={{ maxHeight: "200px", maxWidth: "100%" }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-success flex-grow-1"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Adding...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle"></i> Add Course
                      </>
                    )}
                  </button>

                  <button 
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/admin")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}