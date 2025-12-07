package com.ocp.onlinecourse.repository;

import com.ocp.onlinecourse.model.Course;
import com.ocp.onlinecourse.model.Enrollment;
import com.ocp.onlinecourse.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    boolean existsByUserAndCourse(User user, Course course);

    // ⭐ REQUIRED FOR EnrollmentService
    List<Enrollment> findByUserId(Long userId);
}
