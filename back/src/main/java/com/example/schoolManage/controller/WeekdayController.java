package com.example.schoolManage.controller;

import com.example.schoolManage.model.time.Weekday;
import com.example.schoolManage.repository.WeekdayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/days")
@RequiredArgsConstructor
public class WeekdayController {
    private final WeekdayRepository weekdayRepository;

    @GetMapping
    public ResponseEntity<List<Weekday>> getWeekdays() {
        return new ResponseEntity<>(weekdayRepository.findAll(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Optional<Weekday>> getWeekday(@RequestParam String day) {
        return new ResponseEntity<>(weekdayRepository.findByDay(day), HttpStatus.OK);
    }
}
