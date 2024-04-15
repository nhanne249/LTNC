//package com.example.schoolManage.service;
//
//import com.example.schoolManage.model.user.Student;
//import com.example.schoolManage.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.data.mongodb.core.query.Criteria;
//import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.Objects;
//
//@Service
//public class StudentService{
//    @Autowired
//    private UserRepository userRepository;
//    @Autowired
//    private MongoTemplate mongoTemplate;
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//    public Student getStudentByUsername(String username){
//        return mongoTemplate.findOne(Query.query(Criteria.where("username").is(username)), Student.class, "users");
//
//    }
//
//    public Student updateStudentByUserName(String username, Student student){
//        //EXCEPTION STUDENT NOT FOUND
//        Student updateStudent = mongoTemplate.findOne(Query.query(Criteria.where("username").is(username)), Student.class, "users");
//        assert updateStudent!= null : "user not found";
//        if(!Objects.isNull(student.getUsername()))
//            updateStudent.setUsername(student.getUsername());
//        if(!Objects.isNull(student.getPassword()))
//            updateStudent.setPassword(passwordEncoder.encode(student.getPassword()));
//        if(!Objects.isNull(student.getName()))
//            updateStudent.setName(student.getName());
//        if(!Objects.isNull(student.getEmail()))
//            updateStudent.setEmail(student.getEmail());
//        if(!Objects.isNull(student.getPhoneNumber()))
//            updateStudent.setPhoneNumber(student.getPhoneNumber());
//        userRepository.save(updateStudent);
//        return updateStudent;
//    }
//
//}
