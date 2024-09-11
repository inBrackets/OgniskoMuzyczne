package com.example.ogniskomuzyczne.student;

import com.example.ogniskomuzyczne.subject.Subject;
import com.example.ogniskomuzyczne.subject.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    StudentRepository studentRepository;
    SubjectRepository subjectRepository;
    MonthScheduleService monthScheduleService;

    public StudentService(StudentRepository studentRepository,
                          MonthScheduleService monthScheduleService,
                          SubjectRepository subjectRepository) {
        this.studentRepository = studentRepository;
        this.monthScheduleService = monthScheduleService;
        this.subjectRepository = subjectRepository;
    }

    public Iterable<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        Optional<Student> student = studentRepository.findById(id);
        return student.orElse(null);
    }

    public Iterable<Student> getStudentsBySubjectId(Long id) {
        Subject subject = subjectRepository.findById(id).orElse(null);
        return subject.getStudents();
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
                        monthSchedule.setMonthState(MonthState.UNPAID);
                    }
                } else {
                    monthSchedule = new MonthSchedule();
                    monthSchedule.setMonthName(monthName);
                    monthSchedule.setNumberOfLessons(0L);
                    monthSchedule.setMonthState(MonthState.UNPAID);
                }
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
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            Student updatedStudent = student.get();
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
            if (!newStudent.getMonthSchedule().isEmpty()) {
                for (MonthSchedule monthSchedule : newStudent.getMonthSchedule()) {
                    if (monthSchedule.getMonthState() != null) {
                        updatedStudent.getMonthSchedule()
                                .stream()
                                .filter(x -> x.getMonthName().equals(monthSchedule.getMonthName()))
                                .findFirst().orElseThrow(() -> new RuntimeException("The month is missing!"))
                                .setMonthState(monthSchedule.getMonthState());
                    }
                    updatedStudent.getMonthSchedule()
                            .stream()
                            .filter(x -> x.getMonthName().equals(monthSchedule.getMonthName()))
                            .findFirst().orElseThrow(() -> new RuntimeException("The month is missing!"))
                            .setNumberOfLessons(monthSchedule.getNumberOfLessons());
                }
            }
            studentRepository.save(updatedStudent);
            return updatedStudent;
        }
        return null;
    }

    public Student addStudentWithSubjectId(Long subjectId, Student student) {
        long studentId = addStudent(student).getId();
        addStudentToSubject(subjectId, studentId);
        return studentRepository.findById(studentId).orElse(null);
    }

    /**
     * Copy from SubjectService
     */
    public Subject addStudentToSubject(Long id, Long studentId) {
        Optional<Subject> subject = subjectRepository.findById(id);
        Optional<Student> student = studentRepository.findById(studentId);
        if(subject.isPresent() && student.isPresent()) {
            Subject updatedSubject = subject.get();
            updatedSubject.getStudents().add(student.get());
            subjectRepository.save(updatedSubject);
            return updatedSubject;
        }
        return  null;
    }
}
