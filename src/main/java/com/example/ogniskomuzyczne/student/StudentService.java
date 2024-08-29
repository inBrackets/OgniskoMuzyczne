package com.example.ogniskomuzyczne.student;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentService {

    StudentRepository studentRepository;
    private Long nextId = 1L;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Iterable<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        Optional<Student> teacher = studentRepository.findById(id);
        return teacher.orElse(null);
    }

    public Student addStudent(Student student) {
        if (student != null) {
            student.setId(nextId++);
            return studentRepository.save(student);
        } else throw new RuntimeException("Student object not valid!");
    }

    public boolean deleteStudent(Long id) {
        Optional<Student> teacher = studentRepository.findById(id);
        if (teacher.isPresent()) {
            studentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Student modifyStudent(Long id, Student newStudent) {
        Optional<Student> teacher = studentRepository.findById(id);
        if (teacher.isPresent()) {
            Student updatedStudent = teacher.get();
            updatedStudent.setName(newStudent.getName());
            studentRepository.save(updatedStudent);
            return updatedStudent;
        }
        return null;
    }
}
