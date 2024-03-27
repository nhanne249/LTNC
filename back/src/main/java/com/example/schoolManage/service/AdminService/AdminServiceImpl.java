package com.example.schoolManage.service.AdminService;

import com.example.schoolManage.model.course.Course;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.User;
import com.example.schoolManage.repository.StudentRepository;
import com.example.schoolManage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(String username) {
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(username));
        //EXCEPTION STUDENT NOT FOUND
        mongoTemplate.findAndRemove(query, User.class, "users");
    }

    @Override
    public void deleteAll() {
        mongoTemplate.findAllAndRemove(Query.query(Criteria.where("name").all()), "users");
    }

    @Override
    public User createUser(User user) {
        return null;
    }

    @Override
    public User updateUser(String username, User user) {
        return null;
    }

    @Override
    public Course addCourse(Course course) {
        return null;
    }

    @Override
    public void deleteCourse(String name) {

    }

}
