package com.example.schoolManage.controller;

import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.model.user.User;
import com.example.schoolManage.service.AdminService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }


    @GetMapping("/users")
    public ResponseEntity<Page<User>> getAllUsers(@RequestParam int page) {
        return new ResponseEntity<>(adminService.getAllUsers(page), HttpStatus.OK);
    }
    @GetMapping("/users/{username}")
    public ResponseEntity<Optional<User>> getByUsername(@PathVariable String username) {
        return new ResponseEntity<>(adminService.getUser(username), HttpStatus.OK);
    }
    @DeleteMapping("/users")
    public ResponseEntity<String> deleteAllUsers(){
        adminService.deleteAllUser();
        return ResponseEntity.ok("all users deleted");
    }
    @DeleteMapping("/users/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        adminService.deleteUser(username);
        return ResponseEntity.ok("User deleted");
    }


    @PostMapping("/students")
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student st = adminService.createStudent(student);
        if (Objects.isNull(st))
            return ResponseEntity.badRequest().build();
        return new ResponseEntity<>(st, HttpStatus.CREATED);
    }
    @GetMapping("/students/{username}")
    public ResponseEntity<Optional<Student>> getStudent(@PathVariable String username) {
        return new ResponseEntity<>(adminService.getStudent(username), HttpStatus.OK);
    }
    @PutMapping("/students/{username}")
    public ResponseEntity<Student> updateStudent(@RequestBody Student student, @PathVariable String username){
        return new ResponseEntity<>(adminService.updateStudent(student, username), HttpStatus.OK);
    }


    @PostMapping("/teachers")
    public ResponseEntity<Teacher> createTeacher(@RequestBody Teacher teacher) {
        Teacher tc = adminService.createTeacher(teacher);
        if (Objects.isNull(tc))
            return ResponseEntity.badRequest().build();
        return new ResponseEntity<>(tc, HttpStatus.CREATED);
    }
    @GetMapping("/teachers/{username}")
    public ResponseEntity<Optional<Teacher>> getTeacher(@PathVariable String username) {
        return new ResponseEntity<>(adminService.getTeacher(username), HttpStatus.OK);
    }
    @PutMapping("/teachers/{username}")
    public ResponseEntity<Teacher> updateTeacher(@RequestBody Teacher teacher, @PathVariable String username){
        return new ResponseEntity<>(adminService.updateTeacher(teacher,username), HttpStatus.OK);
    }
}
