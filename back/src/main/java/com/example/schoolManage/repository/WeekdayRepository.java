package com.example.schoolManage.repository;

import com.example.schoolManage.model.time.Weekday;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface WeekdayRepository extends MongoRepository<Weekday, String> {
    Optional<Weekday> findByDay(String weekday);
}
