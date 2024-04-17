package com.example.schoolManage.repository;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.repository.custom.ClassRepositoryCustom;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
<<<<<<< HEAD
public interface ClassRepository extends MongoRepository<Classroom, ObjectId>, ClassRepositoryCustom {
    Optional<Classroom> findBySubject(String subject);

=======
public interface ClassRepository extends MongoRepository<Classroom, String>, ClassRepositoryCustom {
>>>>>>> 692a21d47e2657bbc8df2d8adccec632263f6102
    List<Classroom> findAllByTeacher(String teacher);

    Optional<Classroom> findByName(String name);
    void deleteByName(String name);
}
