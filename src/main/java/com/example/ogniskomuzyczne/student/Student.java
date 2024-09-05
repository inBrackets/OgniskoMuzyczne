package com.example.ogniskomuzyczne.student;

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
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    String name;
    @OneToMany(targetEntity=MonthSchedule.class,cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, orphanRemoval = true)
    List<MonthSchedule> monthSchedule = new ArrayList<>();
    String phoneNumber;
    public void addMonthSchedule(MonthSchedule monthSchedule) {
        this.monthSchedule.add(monthSchedule);
    }
    BigDecimal pricePerLesson;

}
