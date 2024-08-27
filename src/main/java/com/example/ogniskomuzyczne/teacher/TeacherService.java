package com.example.ogniskomuzyczne.teacher;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TeacherService {

    TeacherRepository teacherRepository;
    private Long nextId = 1L;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public Iterable<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Teacher getTeacherById(Long id) {
        Optional<Teacher> teacher = teacherRepository.findById(id);
        return teacher.orElse(null);
    }

    public Teacher addTeacher(Teacher teacher) {
        if (teacher != null) {
            teacher.setId(nextId++);
            return teacherRepository.save(teacher);
        } else throw new RuntimeException("Student object not valid!");
    }

    public boolean deleteTeacher(Long id) {
        Optional<Teacher> teacher = teacherRepository.findById(id);
        if (teacher.isPresent()) {
            teacherRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Teacher modifyTeacher(Long id, Teacher newTeacher) {
        Optional<Teacher> teacher = teacherRepository.findById(id);
        if (teacher.isPresent()) {
            Teacher updatedTeacher = teacher.get();
            updatedTeacher.setName(newTeacher.getName());
            teacherRepository.save(updatedTeacher);
            return updatedTeacher;
        }
        return null;
    }
}
