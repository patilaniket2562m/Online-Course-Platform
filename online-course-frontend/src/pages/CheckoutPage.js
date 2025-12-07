import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

export default function CheckoutPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/courses/${courseId}`);
        setCourse(res.data);
        setLoading(false);
      } catch (error) {
        alert("Failed to load course details");
        console.error(error);
        setLoading(false);
        navigate("/courses");
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId, navigate]);

  const handleConfirm = async () => {
    setProcessing(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login to enroll");
        navigate("/login");
        return;
      }

      await axios.post(
        `/enroll/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("🎉 Enrollment Successful!");
      navigate("/my-courses");
    } catch (error) {
      setProcessing(false);
      console.error("Checkout Error:", error);

      if (error.response?.status === 400) {
        alert(error.response.data || "Already enrolled in this course!");
        navigate("/my-courses");
      } else if (error.response?.status === 403) {
        alert("Forbidden: You are not allowed to enroll");
      } else if (error.response?.status === 401) {
        alert("Please login to enroll");
        navigate("/login");
      } else {
        alert("Error while confirming enrollment");
      }
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center py-5">
          <i className="bi bi-exclamation-triangle fs-1 d-block mb-3"></i>
          <h3>Course Not Found</h3>
          <p className="mb-4">The course you're looking for doesn't exist or has been removed.</p>
          <button className="btn btn-primary px-4" onClick={() => navigate("/courses")}>
            <i className="bi bi-arrow-left me-2"></i>
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">

          {/* HEADER */}
          <div className="text-center mb-4">
            <h2 className="fw-bold">
              <i className="bi bi-cart-check text-primary me-2"></i>
              Confirm Enrollment
            </h2>
            <p className="text-muted">Review your course details before completing</p>
          </div>

          {/* CARD */}
          <div className="card shadow-lg border-0 overflow-hidden">

            {/* IMAGE */}
            <div style={{ height: "300px", overflow: "hidden" }}>
              <img
                src={course.imageUrl || "https://via.placeholder.com/800x300/667eea/ffffff?text=Course+Preview"}
                alt={course.title}
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x300/667eea/ffffff?text=Course+Preview";
                }}
              />
            </div>

            {/* BODY */}
            <div className="card-body p-5">

              <h3 className="card-title fw-bold mb-3">{course.title}</h3>

              <p className="text-muted mb-4" style={{ lineHeight: "1.8" }}>
                {course.description}
              </p>

              {/* BENEFITS */}
              <div className="alert alert-info border-0 bg-light mb-4">
                <h6 className="fw-bold mb-3">
                  <i className="bi bi-gift-fill me-2"></i>
                  What You'll Get
                </h6>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Lifetime access
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Learn anytime
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Certificate
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Instructor support
                  </li>
                </ul>
              </div>

              {/* PRICING */}
              <div className="card bg-light border-0 mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Course Price</span>
                    <span className="fw-bold">₹{course.price}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Discount</span>
                    <span className="text-success fw-bold">₹0</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span className="h5 fw-bold">Total Amount</span>
                    <span className="h4 text-success fw-bold">₹{course.price}</span>
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="d-grid gap-2">
                <button
                  className="btn btn-success btn-lg py-3 fw-bold"
                  onClick={handleConfirm}
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle-fill me-2"></i>
                      Confirm Enrollment
                    </>
                  )}
                </button>

                <button
                  className="btn btn-outline-secondary py-2"
                  onClick={() => navigate("/courses")}
                  disabled={processing}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Courses
                </button>
              </div>

              <div className="text-center mt-4">
                <small className="text-muted">
                  <i className="bi bi-shield-check me-1"></i>
                  Your enrollment is secure and instant
                </small>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
