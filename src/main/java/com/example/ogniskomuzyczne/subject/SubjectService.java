package com.example.ogniskomuzyczne.subject;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubjectService {

    SubjectRepository subjectRepository;
    private Long nextId = 1L;

    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
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
            subject.setId(nextId++);
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
        Optional<Subject> teacher = subjectRepository.findById(id);
        if (teacher.isPresent()) {
            Subject updatedSubject = teacher.get();
            updatedSubject.setName(newSubject.getName());
            subjectRepository.save(updatedSubject);
            return updatedSubject;
        }
        return null;
    }
}
