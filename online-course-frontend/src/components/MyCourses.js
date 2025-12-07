import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("/courses/my-courses", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setCourses(res.data))
    .catch(err => console.error(err));
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">My Enrolled Courses</h2>

      <div className="row">
        {courses.length === 0 && (
          <div className="alert alert-warning">
            You have not enrolled in any courses yet.
          </div>
        )}

        {courses.map(course => (
          <div className="col-md-4" key={course.id}>
            <div className="card shadow-sm mb-4">
              <img
                src={course.imageUrl}
                className="card-img-top"
                alt="Course"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="fw-bold">{course.title}</h5>
                <p className="text-muted">{course.description}</p>

                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
