package com.example.schoolManage.repository;

import com.example.schoolManage.model.files.Resource;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface ResourceRepository extends MongoRepository<Resource, ObjectId> {
    List<Resource> findAllByClassroom(String classroom);
    void deleteByNameAndClassroom(String name, String classname);
    Optional<Resource> findByNameAndClassroom(String name, String classname);
}
