package com.example.schoolManage.repository;

import com.example.schoolManage.model.time.Schedule;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface ScheduleRepository extends MongoRepository<Schedule, ObjectId> {
    Optional<Schedule> findByDay(String weekday);
}
