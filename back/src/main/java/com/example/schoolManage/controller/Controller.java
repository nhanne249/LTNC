package com.example.schoolManage.controller;

import com.example.schoolManage.model.user.Admin;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.repository.StudentRepository;
import com.example.schoolManage.repository.UserRepository;
import com.example.schoolManage.service.StudentService.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
public class Controller {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private StudentService studentService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    public ResponseEntity<String> register() {
        return ResponseEntity.ok("HELLO");
    }

    @PostMapping("/student")
    public ResponseEntity<Student> registerNewStudent(@RequestBody Student student) {
        //INVALID USRNAME AND EMAIL EXCEPTION
        Student newStudent = new Student(student.getUsername(), passwordEncoder.encode(student.getPassword()),
                student.getName(), student.getEmail(), student.getPhoneNumber());
        userRepository.save(newStudent);
        return new ResponseEntity<Student>(newStudent, HttpStatus.CREATED);
    }
    @PostMapping("/admin")
    public ResponseEntity<Admin> registerNewAdmin(@RequestBody Admin admin){
        Admin newAdmin = new Admin(admin.getUsername(), passwordEncoder.encode(admin.getPassword()));
        userRepository.save(newAdmin);
        return new ResponseEntity<Admin>(newAdmin, HttpStatus.CREATED);
    }
}
