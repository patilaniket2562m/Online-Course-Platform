package com.ocp.onlinecourse.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ocp.onlinecourse.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    // 🔥 Correct method used in ReviewService
    List<Review> findByCourseId(Long courseId);
}
