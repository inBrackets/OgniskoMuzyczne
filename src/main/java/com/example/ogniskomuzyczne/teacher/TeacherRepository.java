package com.example.ogniskomuzyczne.teacher;

import com.example.ogniskomuzyczne.student.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}
