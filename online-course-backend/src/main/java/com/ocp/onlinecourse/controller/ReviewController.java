package com.ocp.onlinecourse.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ocp.onlinecourse.model.Review;
import com.ocp.onlinecourse.service.ReviewService;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")

public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        return ResponseEntity.ok(reviewService.addReview(review));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Review>> getReviewsByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(reviewService.getReviewsByCourse(courseId));
    }
}
