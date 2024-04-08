package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Course;
import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.model.user.User;
import com.example.schoolManage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.UpdateDefinition;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.plaf.ColorUIResource;
import java.util.List;

@Service
public class AdminService{
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private MongoTemplate mongoTemplate;
    public List<User> getAllUsers() {
        return mongoTemplate.findAll(User.class, "users");
    }
    public Student createStudent(Student student){
        if(mongoTemplate.exists(Query.query(Criteria.where("username").is(student.getUsername())),"users" )){
            return null;
        }
        return mongoTemplate.insert(new Student(student.getUsername()
                , passwordEncoder.encode(student.getPassword())
                , student.getName(), student.getStudentId()
                , student.getEmail(), student.getPhoneNumber()), "users");
    }
    public Teacher createTeacher(Teacher teacher){
        if(mongoTemplate.exists(Query.query(Criteria.where("username").is(teacher.getUsername())),"users" )){
            return null;
        }
        return mongoTemplate.insert(new Teacher(teacher.getUsername(),
                passwordEncoder.encode(teacher.getPassword()),
                teacher.getName(),
                teacher.getEmail(),
                teacher.getPhoneNumber()), "users");
    }
    public User getUser(String username) {
        return mongoTemplate.findOne(Query.query(Criteria.where("username").is(username)), User.class, "users");
    }
//    public User updateUser(String username){
//
//    }
    public void deleteUser(String username) {
        //EXCEPTION STUDENT NOT FOUND
        mongoTemplate.findAndRemove(Query.query(Criteria.where("username").is(username)), User.class, "users");
    }
    public Course addCourse(Course course) {
        return mongoTemplate.insert(course, "courses");
    }
    public List<Course> getAllCourses(){
        return mongoTemplate.findAll(Course.class, "users");
    }
    public Course getCourse(String courseId){
        return mongoTemplate.findOne(Query.query(Criteria.where("courseId").is(courseId)), Course.class, "courses");
    }
//    public Course updateCourse(String courseId){
//
//    }
    public void deleteCourse(String courseId) {
        mongoTemplate.findAndRemove(Query.query(Criteria.where("courseId").is(courseId)), Course.class, "courses");
    }
    public Classroom addClass(Classroom classroom){
        return mongoTemplate.insert(classroom, "classes");
    }

}
