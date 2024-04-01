package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Course;
import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.User;
import com.example.schoolManage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUser(String username) {
        return mongoTemplate.findOne(Query.query(Criteria.where("username").is(username)), User.class, "users");
    }

    public void deleteUser(String username) {
        //EXCEPTION STUDENT NOT FOUND
        mongoTemplate.findAndRemove(Query.query(Criteria.where("username").is(username)), User.class, "users");
    }

    public User createUser(User user) {
        return mongoTemplate.insert(user, "users");
    }
    public Course addCourse(Course course) {
        return mongoTemplate.insert(course, "courses");
    }

    public void deleteCourse(String courseId) {
        mongoTemplate.findAndRemove(Query.query(Criteria.where("courseId").is(courseId)), Course.class, "courses");
    }
    public Classroom addClass(Classroom classroom){
        return mongoTemplate.insert(classroom, "classes");
    }

}
