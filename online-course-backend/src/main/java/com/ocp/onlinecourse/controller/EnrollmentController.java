package com.ocp.onlinecourse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ocp.onlinecourse.model.Enrollment;
import com.ocp.onlinecourse.service.EnrollmentService;

@RestController
@RequestMapping("/api/enroll")
@CrossOrigin(
        origins = {
                "http://localhost:3000",
                "https://online-course-platform-eosin.vercel.app"
        },
        allowedHeaders = "*",
        allowCredentials = "true",
        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.PUT,
                RequestMethod.DELETE,
                RequestMethod.OPTIONS
        }
)
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping("/{userId}/{courseId}")
    public ResponseEntity<?> enrollCourse(@PathVariable Long userId, @PathVariable Long courseId) {
        return ResponseEntity.ok(enrollmentService.enrollUser(userId, courseId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Enrollment>> getUserEnrollments(@PathVariable Long userId) {
        return ResponseEntity.ok(enrollmentService.getUserEnrollments(userId));
    }
}
