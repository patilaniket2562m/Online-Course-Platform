// import React, { useState, useEffect } from "react";
// import { getCurrentUser } from "../api/authService";
// import axios from "../api/axiosConfig";
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const user = getCurrentUser();
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     enrolledCourses: 0,
//     completedCourses: 0,
//     totalSpent: 0,
//   });

//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }
//     loadUserData();
//   }, [user, navigate]);

//   const loadUserData = async () => {
//     try {
//       if (user.role === "USER") {
//         const res = await axios.get("/courses/my-courses");
//         setEnrolledCourses(res.data);
        
//         const totalSpent = res.data.reduce((sum, course) => sum + course.price, 0);
        
//         setStats({
//           enrolledCourses: res.data.length,
//           completedCourses: 0, // This can be connected to backend later
//           totalSpent: totalSpent,
//         });
//       } else if (user.role === "ADMIN") {
//         const coursesRes = await axios.get("/courses");
//         const usersRes = await axios.get("/admin/users");
        
//         setStats({
//           totalCourses: coursesRes.data.length,
//           totalUsers: usersRes.data.length,
//           totalRevenue: 0, // This can be calculated from enrollments
//         });
//       }
      
//       setLoading(false);
//     } catch (error) {
//       console.error("Error loading profile data:", error);
//       setLoading(false);
//     }
//   };

//   if (!user) {
//     return null;
//   }

//   if (loading) {
//     return (
//       <div className="container mt-5 text-center">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4 mb-5">
//       {/* Profile Header */}
//       <div className="row mb-4">
//         <div className="col-12">
//           <div className="card shadow-sm border-0">
//             <div className="card-body p-4">
//               <div className="row align-items-center">
//                 {/* Profile Avatar */}
//                 <div className="col-md-2 text-center mb-3 mb-md-0">
//                   <div 
//                     className="profile-avatar-large mx-auto"
//                     style={{
//                       width: "120px",
//                       height: "120px",
//                       borderRadius: "50%",
//                       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "3rem",
//                       color: "white",
//                     }}
//                   >
//                     <i className="bi bi-person-fill"></i>
//                   </div>
//                 </div>

//                 {/* Profile Info */}
//                 <div className="col-md-7">
//                   <h2 className="fw-bold mb-2">
//                     {user.email.split('@')[0].charAt(0).toUpperCase() + 
//                      user.email.split('@')[0].slice(1)}
//                   </h2>
//                   <p className="text-muted mb-2">
//                     <i className="bi bi-envelope-fill me-2"></i>
//                     {user.email}
//                   </p>
//                   <div className="d-flex align-items-center gap-2">
//                     {user.role === "ADMIN" ? (
//                       <span className="badge bg-warning text-dark px-3 py-2">
//                         <i className="bi bi-shield-fill-check me-1"></i>
//                         Administrator
//                       </span>
//                     ) : (
//                       <span className="badge bg-success px-3 py-2">
//                         <i className="bi bi-person-badge-fill me-1"></i>
//                         Student
//                       </span>
//                     )}
//                     <span className="badge bg-secondary px-3 py-2">
//                       <i className="bi bi-calendar-check me-1"></i>
//                       Member since 2024
//                     </span>
//                   </div>
//                 </div>

//                 {/* Edit Profile Button */}
//                 <div className="col-md-3 text-md-end">
//                   <button 
//                     className="btn btn-outline-primary"
//                     onClick={() => alert("Edit profile feature coming soon!")}
//                   >
//                     <i className="bi bi-pencil-square me-2"></i>
//                     Edit Profile
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Statistics Cards */}
//       <div className="row mb-4">
//         {user.role === "USER" ? (
//           <>
//             {/* User Statistics */}
//             <div className="col-md-4 mb-3">
//               <div className="card shadow-sm border-0 h-100">
//                 <div className="card-body text-center p-4">
//                   <div 
//                     className="icon-circle mx-auto mb-3"
//                     style={{
//                       width: "70px",
//                       height: "70px",
//                       borderRadius: "50%",
//                       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <i className="bi bi-book-fill text-white fs-3"></i>
//                   </div>
//                   <h3 className="fw-bold mb-1">{stats.enrolledCourses}</h3>
//                   <p className="text-muted mb-0">Enrolled Courses</p>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4 mb-3">
//               <div className="card shadow-sm border-0 h-100">
//                 <div className="card-body text-center p-4">
//                   <div 
//                     className="icon-circle mx-auto mb-3"
//                     style={{
//                       width: "70px",
//                       height: "70px",
//                       borderRadius: "50%",
//                       background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <i className="bi bi-check-circle-fill text-white fs-3"></i>
//                   </div>
//                   <h3 className="fw-bold mb-1">{stats.completedCourses}</h3>
//                   <p className="text-muted mb-0">Completed</p>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4 mb-3">
//               <div className="card shadow-sm border-0 h-100">
//                 <div className="card-body text-center p-4">
//                   <div 
//                     className="icon-circle mx-auto mb-3"
//                     style={{
//                       width: "70px",
//                       height: "70px",
//                       borderRadius: "50%",
//                       background: "linear-gradient(135deg, #ffc107 0%, #ff9800 100%)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <i className="bi bi-currency-rupee text-white fs-3"></i>
//                   </div>
//                   <h3 className="fw-bold mb-1">₹{stats.totalSpent}</h3>
//                   <p className="text-muted mb-0">Total Invested</p>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : (
//           <>
//             {/* Admin Statistics */}
//             <div className="col-md-4 mb-3">
//               <div className="card shadow-sm border-0 h-100">
//                 <div className="card-body text-center p-4">
//                   <div 
//                     className="icon-circle mx-auto mb-3"
//                     style={{
//                       width: "70px",
//                       height: "70px",
//                       borderRadius: "50%",
//                       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <i className="bi bi-book-fill text-white fs-3"></i>
//                   </div>
//                   <h3 className="fw-bold mb-1">{stats.totalCourses}</h3>
//                   <p className="text-muted mb-0">Total Courses</p>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4 mb-3">
//               <div className="card shadow-sm border-0 h-100">
//                 <div className="card-body text-center p-4">
//                   <div 
//                     className="icon-circle mx-auto mb-3"
//                     style={{
//                       width: "70px",
//                       height: "70px",
//                       borderRadius: "50%",
//                       background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <i className="bi bi-people-fill text-white fs-3"></i>
//                   </div>
//                   <h3 className="fw-bold mb-1">{stats.totalUsers}</h3>
//                   <p className="text-muted mb-0">Total Users</p>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4 mb-3">
//               <div className="card shadow-sm border-0 h-100">
//                 <div className="card-body text-center p-4">
//                   <div 
//                     className="icon-circle mx-auto mb-3"
//                     style={{
//                       width: "70px",
//                       height: "70px",
//                       borderRadius: "50%",
//                       background: "linear-gradient(135deg, #ffc107 0%, #ff9800 100%)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <i className="bi bi-graph-up text-white fs-3"></i>
//                   </div>
//                   <h3 className="fw-bold mb-1">₹{stats.totalRevenue}</h3>
//                   <p className="text-muted mb-0">Total Revenue</p>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Recent Activity / Enrolled Courses */}
//       {user.role === "USER" && (
//         <div className="row">
//           <div className="col-12">
//             <div className="card shadow-sm border-0">
//               <div className="card-header bg-white py-3">
//                 <h5 className="mb-0 fw-bold">
//                   <i className="bi bi-clock-history me-2 text-primary"></i>
//                   Recent Activity
//                 </h5>
//               </div>
//               <div className="card-body">
//                 {enrolledCourses.length === 0 ? (
//                   <div className="text-center py-5">
//                     <i className="bi bi-inbox fs-1 text-muted d-block mb-3"></i>
//                     <p className="text-muted">No courses enrolled yet</p>
//                     <button 
//                       className="btn btn-primary"
//                       onClick={() => navigate("/courses")}
//                     >
//                       Browse Courses
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="list-group list-group-flush">
//                     {enrolledCourses.slice(0, 5).map((course) => (
//                       <div 
//                         key={course.id}
//                         className="list-group-item px-0 py-3"
//                       >
//                         <div className="d-flex align-items-center">
//                           <div 
//                             className="course-thumb me-3"
//                             style={{
//                               width: "60px",
//                               height: "60px",
//                               borderRadius: "8px",
//                               overflow: "hidden",
//                             }}
//                           >
//                             <img 
//                               src={course.imageUrl || "https://via.placeholder.com/60"}
//                               alt={course.title}
//                               style={{
//                                 width: "100%",
//                                 height: "100%",
//                                 objectFit: "cover",
//                               }}
//                             />
//                           </div>
//                           <div className="flex-grow-1">
//                             <h6 className="mb-1">{course.title}</h6>
//                             <small className="text-muted">
//                               <i className="bi bi-person me-1"></i>
//                               {course.instructor || "Instructor"}
//                             </small>
//                           </div>
//                           <div className="text-end">
//                             <button 
//                               className="btn btn-sm btn-outline-primary"
//                               onClick={() => navigate("/my-courses")}
//                             >
//                               Continue
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Admin Quick Actions */}
//       {user.role === "ADMIN" && (
//         <div className="row">
//           <div className="col-12">
//             <div className="card shadow-sm border-0">
//               <div className="card-header bg-white py-3">
//                 <h5 className="mb-0 fw-bold">
//                   <i className="bi bi-lightning-charge-fill me-2 text-warning"></i>
//                   Quick Actions
//                 </h5>
//               </div>
//               <div className="card-body">
//                 <div className="row g-3">
//                   <div className="col-md-4">
//                     <button 
//                       className="btn btn-primary w-100 py-3"
//                       onClick={() => navigate("/admin/add-course")}
//                     >
//                       <i className="bi bi-plus-circle-fill d-block fs-3 mb-2"></i>
//                       Add New Course
//                     </button>
//                   </div>
//                   <div className="col-md-4">
//                     <button 
//                       className="btn btn-warning w-100 py-3"
//                       onClick={() => navigate("/admin/manage-courses")}
//                     >
//                       <i className="bi bi-gear-fill d-block fs-3 mb-2"></i>
//                       Manage Courses
//                     </button>
//                   </div>
//                   <div className="col-md-4">
//                     <button 
//                       className="btn btn-info w-100 py-3 text-white"
//                       onClick={() => navigate("/courses")}
//                     >
//                       <i className="bi bi-eye-fill d-block fs-3 mb-2"></i>
//                       View All Courses
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect, useCallback } from "react";
import { getCurrentUser } from "../api/authService";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    totalSpent: 0,
  });

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FIX: Wrap loadUserData in useCallback
  const loadUserData = useCallback(async () => {
    try {
      if (user.role === "USER") {
        const res = await axios.get("/courses/my-courses");
        setEnrolledCourses(res.data);

        const totalSpent = res.data.reduce((sum, course) => sum + course.price, 0);

        setStats({
          enrolledCourses: res.data.length,
          completedCourses: 0,
          totalSpent: totalSpent,
        });

      } else if (user.role === "ADMIN") {
        const coursesRes = await axios.get("/courses");
        const usersRes = await axios.get("/admin/users");

        setStats({
          totalCourses: coursesRes.data.length,
          totalUsers: usersRes.data.length,
          totalRevenue: 0,
        });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading profile data:", error);
      setLoading(false);
    }
  }, [user]); // 👈 required dependency

  // ✅ Updated useEffect (Warning removed)
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadUserData();
  }, [user, navigate, loadUserData]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      {/* Profile Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <div className="row align-items-center">
                {/* Profile Avatar */}
                <div className="col-md-2 text-center mb-3 mb-md-0">
                  <div
                    className="profile-avatar-large mx-auto"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "3rem",
                      color: "white",
                    }}
                  >
                    <i className="bi bi-person-fill"></i>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="col-md-7">
                  <h2 className="fw-bold mb-2">
                    {user.email.split("@")[0].charAt(0).toUpperCase() +
                      user.email.split("@")[0].slice(1)}
                  </h2>
                  <p className="text-muted mb-2">
                    <i className="bi bi-envelope-fill me-2"></i>
                    {user.email}
                  </p>
                  <div className="d-flex align-items-center gap-2">
                    {user.role === "ADMIN" ? (
                      <span className="badge bg-warning text-dark px-3 py-2">
                        <i className="bi bi-shield-fill-check me-1"></i>
                        Administrator
                      </span>
                    ) : (
                      <span className="badge bg-success px-3 py-2">
                        <i className="bi bi-person-badge-fill me-1"></i>
                        Student
                      </span>
                    )}
                    <span className="badge bg-secondary px-3 py-2">
                      <i className="bi bi-calendar-check me-1"></i>
                      Member since 2024
                    </span>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <div className="col-md-3 text-md-end">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => alert("Edit profile feature coming soon!")}
                  >
                    <i className="bi bi-pencil-square me-2"></i>
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-4">
        {user.role === "USER" ? (
          <>
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center p-4">
                  <div
                    className="icon-circle mx-auto mb-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className="bi bi-book-fill text-white fs-3"></i>
                  </div>
                  <h3 className="fw-bold mb-1">{stats.enrolledCourses}</h3>
                  <p className="text-muted mb-0">Enrolled Courses</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center p-4">
                  <div
                    className="icon-circle mx-auto mb-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className="bi bi-check-circle-fill text-white fs-3"></i>
                  </div>
                  <h3 className="fw-bold mb-1">{stats.completedCourses}</h3>
                  <p className="text-muted mb-0">Completed</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center p-4">
                  <div
                    className="icon-circle mx-auto mb-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #ffc107 0%, #ff9800 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className="bi bi-currency-rupee text-white fs-3"></i>
                  </div>
                  <h3 className="fw-bold mb-1">₹{stats.totalSpent}</h3>
                  <p className="text-muted mb-0">Total Invested</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center p-4">
                  <div
                    className="icon-circle mx-auto mb-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className="bi bi-book-fill text-white fs-3"></i>
                  </div>
                  <h3 className="fw-bold mb-1">{stats.totalCourses}</h3>
                  <p className="text-muted mb-0">Total Courses</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center p-4">
                  <div
                    className="icon-circle mx-auto mb-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className="bi bi-people-fill text-white fs-3"></i>
                  </div>
                  <h3 className="fw-bold mb-1">{stats.totalUsers}</h3>
                  <p className="text-muted mb-0">Total Users</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center p-4">
                  <div
                    className="icon-circle mx-auto mb-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #ffc107 0%, #ff9800 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className="bi bi-graph-up text-white fs-3"></i>
                  </div>
                  <h3 className="fw-bold mb-1">₹{stats.totalRevenue}</h3>
                  <p className="text-muted mb-0">Total Revenue</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Recent Activity */}
      {user.role === "USER" && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fw-bold">
                  <i className="bi bi-clock-history me-2 text-primary"></i>
                  Recent Activity
                </h5>
              </div>
              <div className="card-body">
                {enrolledCourses.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-inbox fs-1 text-muted d-block mb-3"></i>
                    <p className="text-muted">No courses enrolled yet</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/courses")}
                    >
                      Browse Courses
                    </button>
                  </div>
                ) : (
                  <div className="list-group list-group-flush">
                    {enrolledCourses.slice(0, 5).map((course) => (
                      <div
                        key={course.id}
                        className="list-group-item px-0 py-3"
                      >
                        <div className="d-flex align-items-center">
                          <div
                            className="course-thumb me-3"
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "8px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={course.imageUrl || "https://via.placeholder.com/60"}
                              alt={course.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-1">{course.title}</h6>
                            <small className="text-muted">
                              <i className="bi bi-person me-1"></i>
                              {course.instructor || "Instructor"}
                            </small>
                          </div>
                          <div className="text-end">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => navigate("/my-courses")}
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Quick Actions */}
      {user.role === "ADMIN" && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fw-bold">
                  <i className="bi bi-lightning-charge-fill me-2 text-warning"></i>
                  Quick Actions
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <button
                      className="btn btn-primary w-100 py-3"
                      onClick={() => navigate("/admin/add-course")}
                    >
                      <i className="bi bi-plus-circle-fill d-block fs-3 mb-2"></i>
                      Add New Course
                    </button>
                  </div>
                  <div className="col-md-4">
                    <button
                      className="btn btn-warning w-100 py-3"
                      onClick={() => navigate("/admin/manage-courses")}
                    >
                      <i className="bi bi-gear-fill d-block fs-3 mb-2"></i>
                      Manage Courses
                    </button>
                  </div>
                  <div className="col-md-4">
                    <button
                      className="btn btn-info w-100 py-3 text-white"
                      onClick={() => navigate("/courses")}
                    >
                      <i className="bi bi-eye-fill d-block fs-3 mb-2"></i>
                      View All Courses
                    </button>
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
