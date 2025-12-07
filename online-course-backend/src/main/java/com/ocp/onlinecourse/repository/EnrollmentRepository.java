package com.ocp.onlinecourse.repository;

import com.ocp.onlinecourse.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    boolean existsByUserIdAndCourseId(Long userId, Long courseId);

}
