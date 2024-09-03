package com.example.ogniskomuzyczne.student;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class MonthSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long monthScheduleId;
    String monthName;
    MonthState monthState;
    long numberOfLessons;
    BigDecimal pricePerLesson;

}
