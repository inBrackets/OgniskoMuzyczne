package com.example.ogniskomuzyczne.subject;

import com.example.ogniskomuzyczne.student.Student;
import com.example.ogniskomuzyczne.student.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {

    SubjectRepository subjectRepository;
    StudentRepository studentRepository;
    private Long nextId = 1L;

    public SubjectService(SubjectRepository subjectRepository, StudentRepository studentRepository) {
        this.subjectRepository = subjectRepository;
        this.studentRepository = studentRepository;
    }

    public Iterable<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Subject getSubjectById(Long id) {
        Optional<Subject> teacher = subjectRepository.findById(id);
        return teacher.orElse(null);
    }

    public Subject addSubject(Subject subject) {
        if (subject != null) {
            if (subject.getStudents() == null) subject.setStudents(new ArrayList<>());
            return subjectRepository.save(subject);
        } else throw new RuntimeException("Student object not valid!");
    }

    public boolean deleteSubject(Long id) {
        Optional<Subject> teacher = subjectRepository.findById(id);
        if (teacher.isPresent()) {
            subjectRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Subject modifySubject(Long id, Subject newSubject) {
        Optional<Subject> subject = subjectRepository.findById(id);
        if (subject.isPresent()) {
            Subject updatedSubject = subject.get();
            updatedSubject.setSubjectName(newSubject.getSubjectName());
            updatedSubject.setTeacherName(newSubject.getTeacherName());
            subjectRepository.save(updatedSubject);
            return updatedSubject;
        }
        return null;
    }

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

    public Subject getSubjectByStudentId(Long id) {
        Iterable<Subject> allSubjects = getAllSubjects();
        for (Subject subject: allSubjects) {
            for (Student student: subject.getStudents()) {
                if (student.getId() == id) return subject;
            }
        }
        return null;
    }
}
