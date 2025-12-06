import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("/courses")
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));
  }, []);

  const enrollCourse = async (courseId) => {
    try {
      await axios.post(`/courses/enroll/${courseId}`);
      alert("Enrolled Successfully!");
    } catch (err) {
      alert("Already Enrolled or Login Required");
    }
  };

  return (
    <div className="container">
      <h2>Available Courses</h2>
      <div className="row">
        {courses.map(course => (
          <div className="col-md-4" key={course.id}>
            <div className="card mb-3">
              <img src={course.imageUrl} className="card-img-top" alt="Course" height="180"/>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p>{course.description}</p>
                <strong>Instructor:</strong> {course.instructor} <br/>
                <strong>Price:</strong> ₹{course.price} <br/>
                <button className="btn btn-primary mt-2"
                    onClick={() => enrollCourse(course.id)}>
                    Enroll
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
