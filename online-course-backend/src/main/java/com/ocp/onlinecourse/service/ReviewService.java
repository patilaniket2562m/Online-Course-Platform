package com.ocp.onlinecourse.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ocp.onlinecourse.model.Review;
import com.ocp.onlinecourse.repository.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByCourse(Long courseId) {
        return reviewRepository.findByCourseId(courseId);
    }
}
