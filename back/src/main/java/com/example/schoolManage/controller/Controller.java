package com.example.schoolManage.controller;

import com.example.schoolManage.Dto.LoginRequest;
import com.example.schoolManage.model.user.Admin;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.repository.UserRepository;
import com.example.schoolManage.service.JwtsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("")
public class Controller {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    JwtsService authenticationService;

    @PostMapping("/student")
    public ResponseEntity<Student> registerNewStudent(@RequestBody Student student) {
        // INVALID USRNAME AND EMAIL EXCEPTION
        if (isExist(student.getUsername())) {
            return ResponseEntity.badRequest().build();
        }
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        student.setRole("STUDENT");
        return new ResponseEntity<Student>(mongoTemplate.insert(student), HttpStatus.CREATED);
    }

    @PostMapping("/admin")
    public ResponseEntity<Admin> registerNewAdmin(@RequestBody Admin admin) {
        if (isExist(admin.getUsername())) {
            ResponseEntity.badRequest().build();
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setRole("ADMIN");
        return new ResponseEntity<Admin>(mongoTemplate.insert(admin), HttpStatus.CREATED);
    }

    @PostMapping("/teacher")
    public ResponseEntity<Teacher> registerNewTeacher(@RequestBody Teacher teacher) {
        if (isExist(teacher.getUsername())) {
            return ResponseEntity.badRequest().build();
        }
        teacher.setPassword(passwordEncoder.encode(teacher.getPassword()));
        teacher.setRole("TEACHER");
        return new ResponseEntity<Teacher>(mongoTemplate.insert(teacher, "users"), HttpStatus.CREATED);

    }

    private boolean isExist(String username) {
        if (mongoTemplate.exists(Query.query(Criteria.where("username").is(username)), "users")) {
            System.out.println("username has been used");
            return true;
        }
        return false;
    }
}
