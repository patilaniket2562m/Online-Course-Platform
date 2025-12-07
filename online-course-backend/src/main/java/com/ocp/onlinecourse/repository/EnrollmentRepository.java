package com.ocp.onlinecourse.repository;

import com.ocp.onlinecourse.model.Course;
import com.ocp.onlinecourse.model.Enrollment;
import com.ocp.onlinecourse.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    // Check duplicate enrollment
    boolean existsByUserAndCourse(User user, Course course);

    // Get enrollments for "My Courses" page
    List<Enrollment> findByUserId(Long userId);
}
