package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicReference;
@Service
public class TeacherService {
    @Autowired
    private MongoTemplate mongoTemplate;
    public List<Classroom> getAllClasses(String teacherUsername){
        Teacher teacher = mongoTemplate.findOne(Query.query(Criteria.where("username").is(teacherUsername)), Teacher.class, "users");
        return teacher.getTeachingClasses();
    }
    public Classroom getClass(String teacherUsername, String classId){
        Teacher teacher = mongoTemplate.findOne(Query.query(Criteria.where("username").is(teacherUsername)), Teacher.class, "users");
        AtomicReference<Classroom> cr = new AtomicReference<>();
        teacher.getTeachingClasses().forEach(courseClass -> {
            if(Objects.equals(courseClass.getClassId(), classId)){
                cr.set(courseClass);
            }
        });
        return cr.get();
    }
    public Classroom addClass(String teacherUsername, String classId){
        Teacher teacher = mongoTemplate.findOne(Query.query(Criteria.where("username").is(teacherUsername)), Teacher.class, "users");
        Classroom classroom = mongoTemplate.findOne(Query.query(Criteria.where("classId").is(classId)), Classroom.class, "classes");
        teacher.getTeachingClasses().add(classroom);
        mongoTemplate.save(teacher);
        return classroom;
    }
}
