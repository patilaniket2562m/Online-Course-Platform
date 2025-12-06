import React from "react";

export default function About() {
  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-info-circle-fill text-primary me-2"></i>
        About LearnHub
      </h2>
      <div className="card shadow-sm border-0 p-4">
        <p className="lead">
          LearnHub is a leading online learning platform dedicated to providing high-quality education to students worldwide.
        </p>
        <p>
          Founded in 2024, we've helped thousands of students achieve their learning goals through expert-led courses,
          interactive content, and a supportive community.
        </p>
        <hr />
        <h4 className="mt-4">Our Mission</h4>
        <p>
          To make quality education accessible to everyone, everywhere, and empower learners to achieve their full potential.
        </p>
        <h4 className="mt-4">Our Values</h4>
        <ul>
          <li>Excellence in Education</li>
          <li>Student Success First</li>
          <li>Innovation and Technology</li>
          <li>Community and Collaboration</li>
        </ul>
      </div>
    </div>
  );
}