package com.example.schoolManage.repository;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.repository.custom.ClassRepositoryCustom;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;
@Repository
public interface ClassRepository extends MongoRepository<Classroom, String>, ClassRepositoryCustom {
    Optional<Classroom> findBySubject(String subject);
    List<Classroom> findAllByTeacher(String teacher);

    List<Classroom> findAllBySubject(String subject);

}
