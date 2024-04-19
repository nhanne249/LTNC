package com.example.schoolManage.controller;

import com.example.schoolManage.model.time.Schedule;
import com.example.schoolManage.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/days")
@RequiredArgsConstructor
public class ScheduleController {
    private final ScheduleRepository scheduleRepository;

    @GetMapping
    public ResponseEntity<List<Schedule>> getWeekdays() {
        return new ResponseEntity<>(scheduleRepository.findAll(), HttpStatus.OK);
    }
}
