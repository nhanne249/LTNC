package com.example.schoolManage.repository;

import com.example.schoolManage.model.shared.Faculty;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FacultyRepository extends MongoRepository<Faculty, ObjectId> {
    Optional<Faculty> findByName(String name);

    void deleteByName(String faculty);
}
