package com.example.schoolManage.service;

import com.example.schoolManage.model.time.Weekday;
import com.example.schoolManage.repository.WeekdayRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WeekdayService {
    private final WeekdayRepository weekdayRepository;

    public WeekdayService(WeekdayRepository weekdayRepository) {
        this.weekdayRepository = weekdayRepository;
    }
    public List<Weekday> getAllWeekdays() {return weekdayRepository.findAll();}
    public Optional<Weekday> getWeekdayByName(String day) {return weekdayRepository.findByDay(day);}
}
