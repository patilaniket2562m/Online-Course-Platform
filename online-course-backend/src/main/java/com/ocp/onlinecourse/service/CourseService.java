package com.ocp.onlinecourse.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.onlinecourse.model.Course;
import com.ocp.onlinecourse.model.User;
import com.ocp.onlinecourse.repository.CourseRepository;
import com.ocp.onlinecourse.repository.UserRepository;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + id));
    }

    @Transactional
    public void deleteCourse(Long id) {
        System.out.println("=== DELETING COURSE ===");
        System.out.println("Course ID: " + id);
        
        // Check if course exists
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + id));
        
        System.out.println("Course found: " + course.getTitle());
        
        // Step 1: Remove this course from all users' enrolled courses
        List<User> allUsers = userRepository.findAll();
        for (User user : allUsers) {
            if (user.getEnrolledCourses().contains(course)) {
                System.out.println("Removing course from user: " + user.getEmail());
                user.getEnrolledCourses().remove(course);
                userRepository.save(user);
            }
        }
        
        System.out.println("Removed course from all users");
        
        // Step 2: Now delete the course
        courseRepository.deleteById(id);
        
        System.out.println("Course deleted successfully!");
    }
}