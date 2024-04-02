package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Course;
<<<<<<< HEAD:back/src/main/java/com/example/schoolManage/service/AdminService.java
import com.example.schoolManage.model.course.Classroom;
=======
>>>>>>> 949b8106967ac8d1ef9caeac0d1e6c32e8e3c058:back/src/main/java/com/example/schoolManage/service/AdminService/AdminServiceImpl.java
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
<<<<<<< HEAD:back/src/main/java/com/example/schoolManage/service/AdminService.java

    public User getUser(String username) {
        return mongoTemplate.findOne(Query.query(Criteria.where("username").is(username)), User.class, "users");
    }

=======
    @Override
    public User getUser(String username) {
        return mongoTemplate.findOne(Query.query(Criteria.where("username").is(username)), User.class, "users");
    }
    @Override
>>>>>>> 949b8106967ac8d1ef9caeac0d1e6c32e8e3c058:back/src/main/java/com/example/schoolManage/service/AdminService/AdminServiceImpl.java
    public void deleteUser(String username) {
        //EXCEPTION STUDENT NOT FOUND
        mongoTemplate.findAndRemove(Query.query(Criteria.where("username").is(username)), User.class, "users");
    }
<<<<<<< HEAD:back/src/main/java/com/example/schoolManage/service/AdminService.java

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
=======
    @Override
    public User createUser(User user) {
        return mongoTemplate.insert(user, "users");
    }
    @Override
    public Course addCourse(Course course) {
        return mongoTemplate.insert(course, "courses");
    }
    @Override
    public void deleteCourse(String courseId) {
        mongoTemplate.findAndRemove(Query.query(Criteria.where("courseId").is(courseId)), Course.class, "courses");
>>>>>>> 949b8106967ac8d1ef9caeac0d1e6c32e8e3c058:back/src/main/java/com/example/schoolManage/service/AdminService/AdminServiceImpl.java
    }

}
