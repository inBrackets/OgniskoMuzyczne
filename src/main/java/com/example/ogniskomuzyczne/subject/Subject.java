package com.example.ogniskomuzyczne.subject;

import com.example.ogniskomuzyczne.student.MonthSchedule;
import com.example.ogniskomuzyczne.student.Student;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    String subjectName;
    String teacherName;
    BigDecimal subjectPrice;
    @OneToMany(targetEntity= Student.class,cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, orphanRemoval = true)
    List<Student> students = new ArrayList<>();

}
