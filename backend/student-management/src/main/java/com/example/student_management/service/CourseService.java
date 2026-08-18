package com.example.student_management.service;

import com.example.student_management.entity.Course;
import com.example.student_management.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    // Create
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    // Get all
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get by ID
    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    // Update
    public Course updateCourse(Long id, Course courseDetails) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        course.setCourseCode(courseDetails.getCourseCode());
        course.setCourseName(courseDetails.getCourseName());
        course.setDescription(courseDetails.getDescription());
        course.setCredits(courseDetails.getCredits());

        return courseRepository.save(course);
    }

    // Delete
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}