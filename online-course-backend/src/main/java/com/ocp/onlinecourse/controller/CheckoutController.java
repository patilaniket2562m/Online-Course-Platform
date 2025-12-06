package com.ocp.onlinecourse.controller;

import com.ocp.onlinecourse.model.Course;
import com.ocp.onlinecourse.model.User;
import com.ocp.onlinecourse.repository.CourseRepository;
import com.ocp.onlinecourse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @PostMapping("/confirm/{courseId}")
    public ResponseEntity<?> confirmEnrollment(@PathVariable Long courseId) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course Not Found"));

        // Already enrolled check
        if (user.getEnrolledCourses().contains(course)) {
            return ResponseEntity.badRequest().body("Already Enrolled");
        }

        // Add course to user's enrolled list
        user.getEnrolledCourses().add(course);
        userRepository.save(user);

        return ResponseEntity.ok("Enrollment Successful!");
    }
}
