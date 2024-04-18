package com.example.schoolManage.repository;

import com.example.schoolManage.model.Resource;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ResourceRepository extends MongoRepository<Resource, ObjectId> {
    List<Resource> findAllByClassroom(String classroom);
    Optional<Resource> findByName(String name);
}
