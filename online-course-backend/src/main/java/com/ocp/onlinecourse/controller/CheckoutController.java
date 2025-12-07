package com.ocp.onlinecourse.controller;

import com.ocp.onlinecourse.service.EnrollmentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping("/confirm/{courseId}")
    public ResponseEntity<?> confirmEnrollment(
            @PathVariable Long courseId,
            HttpServletRequest request
    ) {
        try {
            String authHeader = request.getHeader("Authorization");

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Missing token");
            }

            String token = authHeader.substring(7);

            enrollmentService.enrollUser(courseId, token);

            return ResponseEntity.ok("Enrollment successful");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Enrollment failed: " + e.getMessage());
        }
    }
}
