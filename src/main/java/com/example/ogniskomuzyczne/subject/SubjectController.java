package com.example.ogniskomuzyczne.subject;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Subjects API", description = "This API enables you to manage the subjects in the DB")
@RequestMapping("/api/v1/subjects")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class SubjectController {
    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @PostMapping
    private ResponseEntity<Subject> addSubject(@RequestBody Subject subject) {
        return new ResponseEntity<>(subjectService.addSubject(subject), HttpStatus.CREATED);
    }

    @GetMapping
    private ResponseEntity<Iterable<Subject>> getAllSubjects() {
        return new ResponseEntity<>(subjectService.getAllSubjects(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    private ResponseEntity<Subject> getSubjectsById(@PathVariable Long id) {
        if(subjectService.getSubjectById(id) != null) {
            return new ResponseEntity<>(subjectService.getSubjectById(id), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    private ResponseEntity<Subject> updateSubject(@PathVariable Long id, @RequestBody Subject subject) {
        Subject newSubject = subjectService.modifySubject(id, subject);
        if(newSubject != null) {
            return new ResponseEntity<>(newSubject, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Subject> deleteSubject(@PathVariable Long id) {
        if(subjectService.deleteSubject(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
