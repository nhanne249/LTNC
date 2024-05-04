package com.example.schoolManage.repository;

import com.example.schoolManage.model.files.Resource;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ResourceRepository extends MongoRepository<Resource, ObjectId> {
    List<Resource> findAllByClassroom(String classroom);
    void deleteByNameAndClassroom(String name, String classname);
    Optional<Resource> findByNameAndClassroom(String name, String classname);
}
