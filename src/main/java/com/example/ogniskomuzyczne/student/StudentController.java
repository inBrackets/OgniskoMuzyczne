package com.example.ogniskomuzyczne.student;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Students API", description = "This API enables you to manage the students in the DB")
@RequestMapping("/api/v1/students")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    private ResponseEntity<Student> addStudent(@RequestBody Student student) {
        return new ResponseEntity<>(studentService.addStudent(student), HttpStatus.CREATED);
    }

    @PostMapping("/withSubjectId/{id}")
    private ResponseEntity<Student> addStudentWithSubjectId(@PathVariable Long id, @RequestBody Student student) {
        return new ResponseEntity<>(studentService.addStudentWithSubjectId(id, student), HttpStatus.CREATED);
    }

    @GetMapping
    private ResponseEntity<Iterable<Student>> getAllStudents() {
        return new ResponseEntity<>(studentService.getAllStudents(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    private ResponseEntity<Student> getStudentsById(@PathVariable Long id) {
        if(studentService.getStudentById(id) != null) {
            return new ResponseEntity<>(studentService.getStudentById(id), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getBySubjectId/{id}")
    private ResponseEntity<Iterable<Student>> getStudentsBySubjectId(@PathVariable Long id) {
        return new ResponseEntity<>(studentService.getStudentsBySubjectId(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    private ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        Student newStudent = studentService.modifyStudent(id, student);
        if(newStudent != null) {
            return new ResponseEntity<>(newStudent, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PatchMapping("/{id}")
    private ResponseEntity<Student> patchStudent(@PathVariable Long id, @RequestBody Student student) {
        Student newStudent = studentService.patchStudent(id, student);
        if(newStudent != null) {
            return new ResponseEntity<>(newStudent, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Student> deleteStudent(@PathVariable Long id) {
        if(studentService.deleteStudent(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
