package com.example.schoolManage.repository;

import com.example.schoolManage.model.Faculty;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FacultyRepository extends MongoRepository<Faculty, ObjectId> {
    Optional<Faculty> findByName(String name);

    void deleteByName(String faculty);
}
