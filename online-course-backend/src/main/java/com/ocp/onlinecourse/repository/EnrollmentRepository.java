package com.ocp.onlinecourse.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.onlinecourse.model.Course;
import com.ocp.onlinecourse.model.Enrollment;
import com.ocp.onlinecourse.model.User;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    // Existing methods
    List<Enrollment> findByUser(User user);
    List<Enrollment> findByCourse(Course course);
    Optional<Enrollment> findByUserAndCourse(User user, Course course);

    // 🔥 Added method to fetch by User ID directly
    List<Enrollment> findByUserId(Long userId);
}
