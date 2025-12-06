package com.ocp.onlinecourse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ocp.onlinecourse.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

}
