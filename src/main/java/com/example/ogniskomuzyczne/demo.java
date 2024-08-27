package com.example.ogniskomuzyczne;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;

public class demo {
    public static void main(String[] args) {
        Month sunday = LocalDate.parse("2016-06-12").getMonth();

        int twelve = LocalDate.parse("2016-06-12").getDayOfMonth();
    }
}
