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
            MonthSchedule monthSchedule;
            Student newStudent = new Student();
            if (student.getName() == null) {
                newStudent.setName("");
            } else {
                newStudent.setName(student.getName());
            }
            if (student.getPhoneNumber() == null ) {
                newStudent.setPhoneNumber("");
            } else {
                newStudent.setPhoneNumber(student.getPhoneNumber());
            }
            for (String monthName : List.of("September", "October", "November", "December", "January", "February", "March", "April", "May", "June")) {
                if (student.getMonthSchedule().stream().anyMatch(x->x.getMonthName().equals(monthName))) {
                    monthSchedule = student.getMonthSchedule().stream().filter(x -> x.getMonthName().equals(monthName)).findFirst().get();
                    if(monthSchedule.getMonthState() == null) {
                        monthSchedule.setMonthState(MonthState.NEUTRAL);
                    }
                } else {
                    monthSchedule = new MonthSchedule();
                    monthSchedule.setMonthName(monthName);
                    monthSchedule.setNumberOfLessons(0L);
                    monthSchedule.setMonthState(MonthState.NEUTRAL);
                }
                newStudent.setPricePerLesson(new BigDecimal(65));
                newStudent.addMonthSchedule(monthSchedule);
            }
            return studentRepository.save(newStudent);
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

    public Student patchStudent(Long id, Student newStudent) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            Student updatedStudent = student.get();
            if (newStudent.getName() != null) {
                updatedStudent.setName(newStudent.getName());
            }
            if (newStudent.getPhoneNumber() != null) {
                updatedStudent.setPhoneNumber(newStudent.getPhoneNumber());
            }
            if (newStudent.getPricePerLesson() != null) {
                updatedStudent.setPricePerLesson(newStudent.getPricePerLesson());
            }
            if (!newStudent.getMonthSchedule().isEmpty()) {
                for (MonthSchedule monthSchedule : newStudent.getMonthSchedule()) {
                    if (monthSchedule.getMonthState() != null) {
                        updatedStudent.getMonthSchedule()
                                .stream()
                                .filter(x -> x.getMonthName().equals(monthSchedule.getMonthName()))
                                .findFirst().orElseThrow(() -> new RuntimeException("The month is missing!"))
                                .setMonthState(monthSchedule.getMonthState());
                    }
                    if (monthSchedule.getNumberOfLessons() != 0) {
                        updatedStudent.getMonthSchedule()
                                .stream()
                                .filter(x -> x.getMonthName().equals(monthSchedule.getMonthName()))
                                .findFirst().orElseThrow(() -> new RuntimeException("The month is missing!"))
                                .setNumberOfLessons(monthSchedule.getNumberOfLessons());
                    }
                }
            }
            studentRepository.save(updatedStudent);
            return updatedStudent;
        }
        return null;
    }
}
