package com.example.schoolManage.controller;

import com.example.schoolManage.model.Student;
import com.example.schoolManage.repository.StudentRepository;
import com.example.schoolManage.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class Controller {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private StudentService studentService;
    @Autowired
    private StudentRepository studentRepository;
    @GetMapping("/register")
    public ResponseEntity register(){
        return ResponseEntity.ok("HELLO");
    }
    @PostMapping("/register")
    public ResponseEntity registerNewStudent(@RequestBody Student student){
        Student newStudent = new Student(student.getUsername(), passwordEncoder.encode(student.getPassword()), student.getName());
        studentRepository.save(newStudent);
        return ResponseEntity.ok("created");
    }
}
