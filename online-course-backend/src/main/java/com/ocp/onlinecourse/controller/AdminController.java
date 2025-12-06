package com.ocp.onlinecourse.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.ocp.onlinecourse.model.Course;
import com.ocp.onlinecourse.model.User;
import com.ocp.onlinecourse.service.CourseService;
import com.ocp.onlinecourse.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/admin")

public class AdminController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private UserRepository userRepository;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/add-course")
    public ResponseEntity<?> addCourse(@RequestBody Course course) {
        try {
            Course savedCourse = courseService.addCourse(course);
            return ResponseEntity.ok(savedCourse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding course: " + e.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<List<User>> allUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete-course/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        try {
            System.out.println("=== DELETE COURSE REQUEST ===");
            System.out.println("Course ID: " + id);

            courseService.deleteCourse(id);

            System.out.println("Course deleted successfully!");
            return ResponseEntity.ok("Course deleted successfully!");
        } catch (Exception e) {
            System.err.println("Error deleting course: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error deleting course: " + e.getMessage());
        }
    }
}
