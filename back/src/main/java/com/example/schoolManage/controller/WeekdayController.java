package com.example.schoolManage.controller;

import com.example.schoolManage.model.Weekday;
import com.example.schoolManage.service.WeekdayService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/days")
public class WeekdayController {
    private final WeekdayService weekdayService;

    public WeekdayController(WeekdayService weekdayService) {
        this.weekdayService = weekdayService;
    }

    @GetMapping
    public ResponseEntity<List<Weekday>> getWeekdays() {
        return new ResponseEntity<>(weekdayService.getAllWeekdays(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Optional<Weekday>> getWeekday(@RequestParam String day) {
        return new ResponseEntity<>(weekdayService.getWeekdayByName(day), HttpStatus.OK);
    }
}
