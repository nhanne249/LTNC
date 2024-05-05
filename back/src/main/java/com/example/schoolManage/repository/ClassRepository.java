package com.example.schoolManage.repository;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.repository.custom.ClassRepositoryCustom;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassRepository extends MongoRepository<Classroom, ObjectId>, ClassRepositoryCustom {
    List<Classroom> findAllByTeacher(String teacher);
    Optional<Classroom> findByName(String name);
    //Optional<Classroom> findBySubject(String subject);
    List<Classroom> findAllBySubject(String subjet);
    void deleteByName(String name);
}
