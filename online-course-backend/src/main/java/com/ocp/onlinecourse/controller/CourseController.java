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
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;


    /** ⭐ GET ALL COURSES (PUBLIC) */
    @GetMapping
    public ResponseEntity<?> getAllCourses() {
        return ResponseEntity.ok(courseRepository.findAll());
    }


    /** ⭐ GET SINGLE COURSE BY ID (PUBLIC) */
    @GetMapping("/{id}")
    public ResponseEntity<?> getCourseDetails(@PathVariable Long id) {
        Optional<Course> course = courseRepository.findById(id);

        if (course.isEmpty()) {
            return ResponseEntity.status(404).body("Course not found");
        }

        return ResponseEntity.ok(course.get());
    }


    /** ⭐ ENROLL USER INTO A COURSE (JWT REQUIRED) */
    @PostMapping("/enroll/{courseId}")
    public ResponseEntity<?> enrollCourse(
            @PathVariable Long courseId,
            HttpServletRequest request
    ) {
        try {
            String authHeader = request.getHeader("Authorization");

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body("Unauthorized: Token missing");
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

            // ⭐ Prevent duplicate enrollment
            if (enrollmentRepository.existsByUserAndCourse(user, course)) {
                return ResponseEntity.badRequest().body("Already enrolled");
            }

            Enrollment enrollment = new Enrollment();
            enrollment.setUser(user);
            enrollment.setCourse(course);

            enrollmentRepository.save(enrollment);

            return ResponseEntity.ok("Enrollment successful");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }


    /** ⭐ GET ENROLLED COURSES OF LOGGED-IN USER */
    @GetMapping("/my-courses")
    public ResponseEntity<?> getMyCourses(HttpServletRequest request) {
        try {
            String authHeader = request.getHeader("Authorization");

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body("Unauthorized: Token missing");
            }

            String token = authHeader.substring(7);
            String email = jwtUtil.extractUsername(token);

            Optional<User> optUser = userRepository.findByEmail(email);

            if (optUser.isEmpty()) {
                return ResponseEntity.status(404).body("User not found");
            }

            User user = optUser.get();

            List<Enrollment> enrollments = enrollmentRepository.findByUserId(user.getId());

            // ⭐ Convert Enrollment → Course (clean return)
            List<Course> courses = enrollments.stream()
                    .map(Enrollment::getCourse)
                    .toList();

            return ResponseEntity.ok(courses);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

}
