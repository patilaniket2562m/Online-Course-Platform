package com.ocp.onlinecourse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.onlinecourse.model.Enrollment;
import com.ocp.onlinecourse.service.EnrollmentService;

@RestController
@RequestMapping("/api/enroll")
@CrossOrigin(origins = "http://localhost:3000")
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
