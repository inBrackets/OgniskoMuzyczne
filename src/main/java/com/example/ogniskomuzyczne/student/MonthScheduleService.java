package com.example.ogniskomuzyczne.student;

import org.springframework.stereotype.Service;

@Service
public class MonthScheduleService {
    MonthScheduleRepository monthScheduleRepository;

    public MonthScheduleService(MonthScheduleRepository monthScheduleRepository) {
        this.monthScheduleRepository = monthScheduleRepository;
    }

    public MonthSchedule createNewMonthSchedule() {
        MonthSchedule monthSchedule = new MonthSchedule();
        monthSchedule.setMonthName("September");
        return monthScheduleRepository.save(monthSchedule);
    }

    public MonthSchedule saveMonthSchedule(MonthSchedule monthSchedule) {
        return monthScheduleRepository.save(monthSchedule);
    }
}
