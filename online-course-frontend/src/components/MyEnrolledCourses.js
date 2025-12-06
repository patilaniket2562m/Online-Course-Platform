import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

const MyEnrolledCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("/courses/my-courses")
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container">
      <h2>My Enrolled Courses</h2>
      <div className="row">
        {courses.map(course => (
          <div className="col-md-4" key={course.id}>
            <div className="card mb-3">
              <img src={course.imageUrl} className="card-img-top" alt="Course" height="180"/>
              <div className="card-body">
                <h5>{course.title}</h5>
                <p>{course.description}</p>
                <strong>Instructor:</strong> {course.instructor}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrolledCourses;
