package com.example.student_management.service;

import com.example.student_management.entity.Student;
import com.example.student_management.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Create
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    // Get all
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    // Update
    public Student updateStudent(Long id, Student studentDetails) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setFirstName(studentDetails.getFirstName());
        student.setLastName(studentDetails.getLastName());
        student.setEmail(studentDetails.getEmail());
        student.setPhone(studentDetails.getPhone());

        return studentRepository.save(student);
    }

    // Delete
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}