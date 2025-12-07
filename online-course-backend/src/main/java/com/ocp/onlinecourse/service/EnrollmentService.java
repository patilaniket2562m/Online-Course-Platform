package com.ocp.onlinecourse.service;

import com.ocp.onlinecourse.model.Course;
import com.ocp.onlinecourse.model.Enrollment;
import com.ocp.onlinecourse.model.User;
import com.ocp.onlinecourse.repository.CourseRepository;
import com.ocp.onlinecourse.repository.EnrollmentRepository;
import com.ocp.onlinecourse.repository.UserRepository;
import com.ocp.onlinecourse.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Enroll a user using JWT Token & Course ID
     */
    public void enrollUser(Long courseId, String token) {

        if (token == null || !token.startsWith("Bearer ")) {
            throw new RuntimeException("Unauthorized request");
        }

        // Extract email from JWT (remove 'Bearer ')
        String jwt = token.substring(7);
        String email = jwtUtil.extractUsername(jwt);

        // Fetch user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch course
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // ⭐ Correct duplicate enrollment check
        if (enrollmentRepository.existsByUserAndCourse(user, course)) {
            throw new RuntimeException("Already enrolled");
        }

        // Save enrollment
        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);

        enrollmentRepository.save(enrollment);
    }
}
