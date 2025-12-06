import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser } from "../api/authService";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const features = [
    {
      icon: "bi-book-fill",
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of experience"
    },
    {
      icon: "bi-clock-fill",
      title: "Learn at Your Pace",
      description: "Lifetime access to course materials, learn anytime, anywhere"
    },
    {
      icon: "bi-award-fill",
      title: "Certificates",
      description: "Earn certificates upon course completion to showcase your skills"
    },
    {
      icon: "bi-people-fill",
      title: "Community Support",
      description: "Join a community of learners and get help when you need it"
    }
  ];

  const popularCourses = [
    {
      title: "Complete Web Development",
      instructor: "John Doe",
      rating: 4.8,
      students: 12500,
      price: 2999,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400"
    },
    {
      title: "Python for Data Science",
      instructor: "Jane Smith",
      rating: 4.9,
      students: 8900,
      price: 3499,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400"
    },
    {
      title: "Digital Marketing Masterclass",
      instructor: "Mike Johnson",
      rating: 4.7,
      students: 6700,
      price: 2499,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400"
    }
  ];

  const stats = [
    { icon: "bi-people-fill", value: "50K+", label: "Active Students" },
    { icon: "bi-book-fill", value: "500+", label: "Courses Available" },
    { icon: "bi-award-fill", value: "100K+", label: "Certificates Issued" },
    { icon: "bi-star-fill", value: "4.8", label: "Average Rating" }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title">
                Learn Without Limits
              </h1>
              <p className="hero-subtitle">
                Start, switch, or advance your career with thousands of courses, 
                Professional Certificates, and degrees from world-class institutions
              </p>
              <div className="hero-buttons">
                {user ? (
                  <button 
                    className="btn-hero-primary"
                    onClick={() => navigate("/courses")}
                  >
                    <i className="bi bi-play-circle me-2"></i>
                    Browse Courses
                  </button>
                ) : (
                  <>
                    <button 
                      className="btn-hero-primary"
                      onClick={() => navigate("/register")}
                    >
                      <i className="bi bi-person-plus me-2"></i>
                      Get Started Free
                    </button>
                    <button 
                      className="btn-hero-secondary"
                      onClick={() => navigate("/courses")}
                    >
                      Explore Courses
                    </button>
                  </>
                )}
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <i className="bi bi-check-circle-fill text-success"></i>
                  <span>Free courses available</span>
                </div>
                <div className="stat-item">
                  <i className="bi bi-check-circle-fill text-success"></i>
                  <span>Expert instructors</span>
                </div>
                <div className="stat-item">
                  <i className="bi bi-check-circle-fill text-success"></i>
                  <span>Lifetime access</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="hero-image">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600" 
                  alt="Learning"
                  className="img-fluid rounded-4 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <div className="row g-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="stat-card">
                  <i className={`bi ${stat.icon}`}></i>
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Choose LearnHub?</h2>
            <p className="section-subtitle">
              Everything you need to succeed in your learning journey
            </p>
          </div>
          <div className="row g-4 mt-4">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className={`bi ${feature.icon}`}></i>
                  </div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="courses-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Courses</h2>
            <button 
              className="btn-view-all"
              onClick={() => navigate("/courses")}
            >
              View All Courses
              <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
          <div className="row g-4 mt-2">
            {popularCourses.map((course, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="course-card-home">
                  <div className="course-image">
                    <img src={course.image} alt={course.title} />
                    <div className="course-badge">Bestseller</div>
                  </div>
                  <div className="course-content">
                    <h5 className="course-title">{course.title}</h5>
                    <p className="course-instructor">
                      <i className="bi bi-person-circle me-1"></i>
                      {course.instructor}
                    </p>
                    <div className="course-meta">
                      <div className="course-rating">
                        <i className="bi bi-star-fill text-warning"></i>
                        <span>{course.rating}</span>
                        <span className="text-muted">({course.students.toLocaleString()})</span>
                      </div>
                      <div className="course-price">
                        <span className="price">₹{course.price}</span>
                      </div>
                    </div>
                    <button 
                      className="btn-enroll-home"
                      onClick={() => navigate("/courses")}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Learning?</h2>
            <p>Join thousands of students already learning on LearnHub</p>
            <button 
              className="btn-cta"
              onClick={() => navigate(user ? "/courses" : "/register")}
            >
              {user ? "Browse Courses" : "Get Started Now"}
              <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <h5 className="footer-brand">
                <i className="bi bi-mortarboard-fill me-2"></i>
                LearnHub
              </h5>
              <p className="footer-text">
                Empowering learners worldwide with quality education and expert instructors.
              </p>
              <div className="social-links">
                <button onClick={() => window.open('https://facebook.com', '_blank')} className="social-link" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </button>
                <button onClick={() => window.open('https://twitter.com', '_blank')} className="social-link" aria-label="Twitter">
                  <i className="bi bi-twitter"></i>
                </button>
                <button onClick={() => window.open('https://instagram.com', '_blank')} className="social-link" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </button>
                <button onClick={() => window.open('https://linkedin.com', '_blank')} className="social-link" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </button>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h6 className="footer-heading">Company</h6>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/about">Careers</Link></li>
                <li><Link to="/about">Blog</Link></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h6 className="footer-heading">Courses</h6>
              <ul className="footer-links">
                <li><Link to="/courses">All Courses</Link></li>
                <li><Link to="/courses">Categories</Link></li>
                <li><Link to="/courses">Instructors</Link></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h6 className="footer-heading">Support</h6>
              <ul className="footer-links">
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/help">FAQ</Link></li>
                <li><Link to="/about">Terms</Link></li>
                <li><Link to="/about">Privacy</Link></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h6 className="footer-heading">Download App</h6>
              <div className="app-buttons">
                <button onClick={() => alert('App Store coming soon!')} className="app-btn">
                  <i className="bi bi-apple"></i>
                  <span>App Store</span>
                </button>
                <button onClick={() => alert('Play Store coming soon!')} className="app-btn">
                  <i className="bi bi-google-play"></i>
                  <span>Play Store</span>
                </button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="mb-0">© 2025 LearnHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}