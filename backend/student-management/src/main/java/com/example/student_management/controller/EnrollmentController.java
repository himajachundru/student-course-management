package com.example.student_management.controller;

import com.example.student_management.entity.Enrollment;
import com.example.student_management.service.EnrollmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "http://localhost:5173")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    // CREATE
    @PostMapping
    public Enrollment createEnrollment(
            @RequestParam Long studentId,
            @RequestParam Long courseId) {

        return enrollmentService.createEnrollment(studentId, courseId);
    }

    // GET ALL
    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Enrollment getEnrollmentById(@PathVariable Long id) {
        return enrollmentService.getEnrollmentById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Enrollment updateEnrollment(
            @PathVariable Long id,
            @RequestParam Long studentId,
            @RequestParam Long courseId) {

        return enrollmentService.updateEnrollment(
                id,
                studentId,
                courseId
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteEnrollment(@PathVariable Long id) {
        enrollmentService.deleteEnrollment(id);
    }
}