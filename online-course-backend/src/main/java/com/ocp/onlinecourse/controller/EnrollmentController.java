package com.ocp.onlinecourse.controller;

import com.ocp.onlinecourse.model.Course;
import com.ocp.onlinecourse.model.Enrollment;
import com.ocp.onlinecourse.model.User;
import com.ocp.onlinecourse.repository.CourseRepository;
import com.ocp.onlinecourse.repository.EnrollmentRepository;
import com.ocp.onlinecourse.repository.UserRepository;
import com.ocp.onlinecourse.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequestMapping("/api/enroll")
public class EnrollmentController {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // ⭐ ENROLL USING POST + JWT + COURSE ID
    @PostMapping("/{courseId}")
    public ResponseEntity<?> enrollCourse(
            @PathVariable Long courseId,
            HttpServletRequest request
    ) {
        try {
            // ⭐ Extract JWT token
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body("Unauthorized: Missing token");
            }

            String token = authHeader.substring(7);
            String email = jwtUtil.extractUsername(token);

            Optional<User> optUser = userRepository.findByEmail(email);
            Optional<Course> optCourse = courseRepository.findById(courseId);

            if (optUser.isEmpty()) {
                return ResponseEntity.status(404).body("User not found");
            }
            if (optCourse.isEmpty()) {
                return ResponseEntity.status(404).body("Course not found");
            }

            User user = optUser.get();
            Course course = optCourse.get();

            // ⭐ Check if already enrolled
            boolean alreadyEnrolled = enrollmentRepository.existsByUserAndCourse(user, course);
            if (alreadyEnrolled) {
                return ResponseEntity.badRequest().body("Already enrolled");
            }

            // ⭐ Save enrollment
            Enrollment enrollment = new Enrollment();
            enrollment.setUser(user);
            enrollment.setCourse(course);
            enrollmentRepository.save(enrollment);

            return ResponseEntity.ok("Enrollment successful");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

}
