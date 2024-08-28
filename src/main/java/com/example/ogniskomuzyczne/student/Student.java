package com.example.ogniskomuzyczne.student;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Month;
import java.util.HashMap;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Student {

    @Id
    long id;
    String name;

}