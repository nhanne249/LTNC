package com.example.schoolManage.repository.custom;

import com.example.schoolManage.model.course.Classroom;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.LinkedList;
import java.util.List;

public class ClassRepositoryCustomImpl implements ClassRepositoryCustom {
    private final MongoTemplate mongoTemplate;

    public ClassRepositoryCustomImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Classroom> findAllByStudent(String username) {
        List<Classroom> classrooms = mongoTemplate.findAll(Classroom.class, "classes");
        List<Classroom> result = new LinkedList<>();
        classrooms.forEach(classroom -> {
            if(classroom.getStudents().contains(username)){
                result.add(classroom);
            }
        });
        return result;
    }
}
