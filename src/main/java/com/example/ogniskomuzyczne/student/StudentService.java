package com.example.ogniskomuzyczne.student;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    StudentRepository studentRepository;
    MonthScheduleService monthScheduleService;

    public StudentService(StudentRepository studentRepository, MonthScheduleService monthScheduleService) {
        this.studentRepository = studentRepository;
        this.monthScheduleService = monthScheduleService;
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
            for(String monthName: List.of("September", "October", "November", "December", "January", "February", "March", "April", "May", "June")) {
                MonthSchedule monthSchedule = new MonthSchedule();
                monthSchedule.setMonthName(monthName);
                monthSchedule.setNumberOfLessons(0L);
                monthSchedule.setPricePerLesson(new BigDecimal("65"));
                monthSchedule.setMonthState(MonthState.NEUTRAL);
                student.addMonthSchedule(monthSchedule);
            }
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
