package com.example.schoolManage.service;

import com.example.schoolManage.model.Student;
import com.example.schoolManage.repository.StudentRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class StudentServiceImpl implements StudentService{
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Override
    public List<Student> getAllStudent() {
        Query query = new Query();
        query.addCriteria(Criteria.where("role").is("STUDENT"));
        return mongoTemplate.find(query, Student.class);

    }

    @Override
    public Optional<Student> getStudentByUsername(String username) {
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(username));
        Student st = mongoTemplate.findOne(query, Student.class);
        return Optional.ofNullable(st);
    }


    @Override
    public Student updateStudentByUserName(String username) {
        return null;
    }

    @Override
    public void deleteStudentByUsername(ObjectId id) {

    }
}
