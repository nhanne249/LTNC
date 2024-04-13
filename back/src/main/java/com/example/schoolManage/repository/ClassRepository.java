package com.example.schoolManage.repository;

import com.example.schoolManage.model.course.Classroom;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClassRepository extends MongoRepository<Classroom, String> {
}
