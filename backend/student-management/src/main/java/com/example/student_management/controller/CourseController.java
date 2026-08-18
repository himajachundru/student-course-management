package com.example.student_management.controller;

import com.example.student_management.entity.Course;
import com.example.student_management.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5174")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    // CREATE
    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseService.createCourse(course);
    }

    // READ ALL
    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    // READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {

        return courseService.getCourseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(
            @PathVariable Long id,
            @RequestBody Course course) {

        try {
            Course updatedCourse =
                    courseService.updateCourse(id, course);

            return ResponseEntity.ok(updatedCourse);

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {

        try {
            courseService.deleteCourse(id);
            return ResponseEntity.noContent().build();

        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}