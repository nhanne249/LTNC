package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Course;
import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService{
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private MongoTemplate mongoTemplate;
    public List<User> getAllUsers() {
        return mongoTemplate.findAll(User.class);
    }

    public User getUser(String username) {
        return mongoTemplate.findOne(Query.query(Criteria.where("username").is(username)), User.class, "users");
    }

    public void deleteUser(String username) {
        //EXCEPTION STUDENT NOT FOUND
        mongoTemplate.findAndRemove(Query.query(Criteria.where("username").is(username)), User.class, "users");
    }
    public Teacher addNewTeacher(Teacher teacher){
        Teacher newTeacher = new Teacher(teacher.getUsername(),
                passwordEncoder.encode(teacher.getPassword()),
                teacher.getName(),
                teacher.getEmail(),
                teacher.getPhoneNumber());
        return mongoTemplate.insert(teacher, "users");
    }
    public Student addNewStudent(Student student){
        Student newStudent = new Student(student.getUsername(),
                passwordEncoder.encode(student.getPassword()),
                student.getName(),
                student.getStudentId(),
                student.getEmail(),
                student.getPhoneNumber());
        return mongoTemplate.insert(newStudent, "users");
    }
    public Course addCourse(Course course) {
        Course newCourse = new Course(course.getName(), course.getCourseId());
        return mongoTemplate.insert(newCourse, "courses");
    }

    public void deleteCourse(String courseId) {
        mongoTemplate.findAndRemove(Query.query(Criteria.where("courseId").is(courseId)), Course.class, "courses");
    }
    public Classroom addClass(Classroom classroom, String courseId){
        Classroom newClassroom = new Classroom(classroom.getPlace(), classroom.getClassId());
        newClassroom.setCourse(mongoTemplate.findOne(Query.query(Criteria.where("courseId").is(courseId)), Course.class, "courses"));
        return mongoTemplate.insert(newClassroom, "classes");
    }

}
