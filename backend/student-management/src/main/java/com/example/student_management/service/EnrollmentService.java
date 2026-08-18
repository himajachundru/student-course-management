package com.example.student_management.service;

import com.example.student_management.entity.Course;
import com.example.student_management.entity.Enrollment;
import com.example.student_management.entity.Student;
import com.example.student_management.repository.CourseRepository;
import com.example.student_management.repository.EnrollmentRepository;
import com.example.student_management.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    public EnrollmentService(
            EnrollmentRepository enrollmentRepository,
            StudentRepository studentRepository,
            CourseRepository courseRepository) {

        this.enrollmentRepository = enrollmentRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }

    // CREATE
    public Enrollment createEnrollment(Long studentId, Long courseId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Enrollment enrollment = new Enrollment(student, course);

        return enrollmentRepository.save(enrollment);
    }

    // GET ALL
    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    // GET BY ID
    public Enrollment getEnrollmentById(Long id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
    }

    // UPDATE
    public Enrollment updateEnrollment(
            Long id,
            Long studentId,
            Long courseId) {

        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        enrollment.setStudent(student);
        enrollment.setCourse(course);

        return enrollmentRepository.save(enrollment);
    }

    // DELETE
    public void deleteEnrollment(Long id) {

        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        enrollmentRepository.delete(enrollment);
    }
}