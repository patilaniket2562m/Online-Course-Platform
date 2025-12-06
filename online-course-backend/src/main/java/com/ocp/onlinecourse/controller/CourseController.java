package com.ocp.onlinecourse.controller;

import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.ocp.onlinecourse.model.Course;
import com.ocp.onlinecourse.model.User;
import com.ocp.onlinecourse.repository.CourseRepository;
import com.ocp.onlinecourse.repository.UserRepository;
import com.ocp.onlinecourse.service.CourseService;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<?> addCourse(@RequestBody Course course) {
        return ResponseEntity.ok(courseService.addCourse(course));
    }

    @GetMapping
    public ResponseEntity<?> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @PostMapping("/enroll/{courseId}")
    public ResponseEntity<?> enrollCourse(@PathVariable Long courseId) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course Not Found"));

        if (!user.getEnrolledCourses().contains(course)) {
            user.getEnrolledCourses().add(course);
            userRepository.save(user);
            return ResponseEntity.ok("Enrolled Successfully!");
        }

        return ResponseEntity.badRequest().body("Already Enrolled!");
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @GetMapping("/my-courses")
    public ResponseEntity<Set<Course>> myCourses() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        return ResponseEntity.ok(user.getEnrolledCourses());
    }
}

