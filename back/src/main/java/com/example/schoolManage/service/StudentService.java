package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Course;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class StudentService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public Student getStudentByUsername(String username){
        return mongoTemplate.findOne(Query.query(Criteria.where("username").is(username)), Student.class, "users");

    }

    public Student updateStudentByUserName(String username, Student student){
        //EXCEPTION STUDENT NOT FOUND
        Student updateStudent = mongoTemplate.findOne(Query.query(Criteria.where("username").is(username)), Student.class, "users");
        assert updateStudent!= null : "user not found";
        if(!Objects.isNull(student.getUsername()))
            updateStudent.setUsername(student.getUsername());
        if(!Objects.isNull(student.getPassword()))
            updateStudent.setPassword(passwordEncoder.encode(student.getPassword()));
        if(!Objects.isNull(student.getName()))
            updateStudent.setName(student.getName());
        if(!Objects.isNull(student.getEmail()))
            updateStudent.setEmail(student.getEmail());
        if(!Objects.isNull(student.getPhoneNumber()))
            updateStudent.setPhoneNumber(student.getPhoneNumber());
        userRepository.save(updateStudent);
        return updateStudent;
    }


    public List<Course> getAllCourses(String username) {
        return Objects.requireNonNull(mongoTemplate.findOne(Query.query(Criteria.where("username").is(username)), Student.class, "users")).getEnrolledCourses();
    }

    public Course enrollCourse(String studentUsername, String courseId) {
        Course course = mongoTemplate.findOne(Query.query(Criteria.where("courseId").is(courseId)), Course.class, "courses");
        assert course != null : "course not found";
        Student st = mongoTemplate.findOne(Query.query(Criteria.where("username").is(studentUsername)), Student.class, "users");
        assert st != null : "user not found";
        st.appendCourse(course);
        userRepository.save(st);
        return course;
    }

    public void disenrollCourse(String username, String courseId) {
        Student st = mongoTemplate.findOne(Query.query(Criteria.where("username").is(username)), Student.class, "users");
        assert st != null : "user not found";
        Course cr = mongoTemplate.findOne(Query.query(Criteria.where("courseId").is(courseId)), Course.class, "courses");
        st.removeCourse(cr);
        userRepository.save(st);
    }
}
