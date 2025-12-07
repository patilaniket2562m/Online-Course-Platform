package com.ocp.onlinecourse.service;

import com.ocp.onlinecourse.model.Course;
import com.ocp.onlinecourse.model.Enrollment;
import com.ocp.onlinecourse.model.User;
import com.ocp.onlinecourse.repository.CourseRepository;
import com.ocp.onlinecourse.repository.EnrollmentRepository;
import com.ocp.onlinecourse.repository.UserRepository;
import com.ocp.onlinecourse.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public void enrollUser(Long courseId, String token) {

        String email = jwtUtil.extractUsername(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // prevent duplicate enrollment
        if (enrollmentRepository.existsByUserIdAndCourseId(user.getId(), course.getId())) {
            throw new RuntimeException("Already enrolled");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);

        enrollmentRepository.save(enrollment);
    }
}
