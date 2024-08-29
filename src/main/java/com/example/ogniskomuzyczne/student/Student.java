package com.example.ogniskomuzyczne.student;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Student {

    @Id
    long id;
    String name;
    String phoneNumber;
    MonthState septemberState;
//    //BigDecimal septemberPrice;
//    MonthState octoberState;
//    //BigDecimal octoberPrice;
//    MonthState novemberState;
//    //BigDecimal novemberPrice;
//    MonthState decemberState;
//    //BigDecimal decemberPrice;
//    MonthState januaryState;
//    //BigDecimal januaryPrice;
//    MonthState februaryState;
//    //BigDecimal februaryPrice;
//    MonthState marchState;
//    //BigDecimal marchPrice;
//    MonthState aprilState;
//    //BigDecimal aprilPrice;
//    MonthState mayState;
//    //BigDecimal mayPrice;
//    MonthState juneState;
    //BigDecimal junePrice;

}
