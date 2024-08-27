package com.example.ogniskomuzyczne.student;

import org.springframework.stereotype.Service;

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

    public Student addStudent(Student student) {
        if (student != null) {
            student.setId(nextId++);
            return studentRepository.save(student);
        }
        else throw new RuntimeException("Student object not valid!");
    }

}
