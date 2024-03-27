package com.example.schoolManage.service.StudentService;

import com.example.schoolManage.model.course.Course;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.repository.StudentRepository;
import com.example.schoolManage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
@Service
public class StudentServiceImpl implements StudentService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public List<Student> getAllStudent() {
        Query query = new Query();
        query.addCriteria(Criteria.where("role").is("STUDENT"));
        return mongoTemplate.find(query, Student.class, "users");

    }

    @Override
    public Optional<Student> getStudentByUsername(String username) {
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(username));
        Student st = mongoTemplate.findOne(query, Student.class, "users");
        return Optional.ofNullable(st);
    }


    @Override
    public Student updateStudentByUserName(String username, Student student) {
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(username));
        System.out.println(username);
        //EXCEPTION STUDENT NOT FOUND
        Student updateStudent = mongoTemplate.findOne(query, Student.class, "users");
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

    @Override
    public void deleteStudentByUsername(String username) {
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(username));
        //EXCEPTION STUDENT NOT FOUND
        mongoTemplate.findAndRemove(query, Student.class, "users");
    }

    @Override
    public Course enrollCourse(String studentUsername, Course course) {
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(studentUsername));
        //EXCEPTION STUDENT NOT FOUND
        Student st = mongoTemplate.findOne(query, Student.class, "users");
        st.appendCourse(course);
        userRepository.save(st);
        return course;
    }

    @Override
    public void disenrollCourse(String username, String courseName) {
        //EXCEPTION STUDENT NOT FOUND
        Student st = mongoTemplate.findOne(Query.query(Criteria.where("username").is(username)), Student.class, "users");
        Course cr = mongoTemplate.findOne(Query.query(Criteria.where("name").is(courseName)), Course.class, "courses");
        st.removeCourse(cr);
        userRepository.save(st);
    }
}
