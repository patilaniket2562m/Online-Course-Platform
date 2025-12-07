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
import java.util.*;

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

    /**
     * ⭐ ENROLL USER IN A COURSE
     */
    @PostMapping("/{courseId}")
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

            // ⭐ Check duplicate enrollment
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


    /**
     * ⭐ GET ALL ENROLLED COURSES OF CURRENT USER (SAFE DTO)
     */
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

            // ⭐ Load enrollments
            List<Enrollment> enrollments = enrollmentRepository.findByUserId(user.getId());

            // ⭐ Convert safely to DTO
            List<Map<String, Object>> courseDTOs = new ArrayList<>();

            for (Enrollment e : enrollments) {
                Course c = e.getCourse();

                Map<String, Object> dto = new HashMap<>();
                dto.put("id", c.getId());
                dto.put("title", c.getTitle());
                dto.put("description", c.getDescription());
                dto.put("imageUrl", c.getImageUrl());
                dto.put("instructor", c.getInstructor());
                dto.put("price", c.getPrice());

                courseDTOs.add(dto);
            }

            return ResponseEntity.ok(courseDTOs);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

}
