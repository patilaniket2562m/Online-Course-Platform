import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

export default function MyEnrolledCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please login first");
          return;
        }

        const res = await axios.get("/enroll/my-courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);

        if (error.response?.status === 401) {
          alert("Please login to view courses");
        } else if (error.response?.status === 403) {
          alert("Forbidden: Not allowed");
        } else {
          alert("Failed to load enrolled courses.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Loading your courses...</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h4 className="text-muted">You have not enrolled in any courses</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">My Enrolled Courses</h2>

      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4" key={course.id}>
            <div className="card shadow-sm mb-4">
              <img
                src={
                  course.imageUrl ||
                  "https://via.placeholder.com/400x200/ccc?text=Course"
                }
                className="card-img-top"
                alt={course.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="fw-bold">{course.title}</h5>
                <p className="text-muted">{course.description}</p>
                <p className="mb-0">
                  <strong>Instructor:</strong> {course.instructor || "N/A"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
