package com.example.schoolManage.controller;

import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.model.user.User;
import com.example.schoolManage.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final MongoTemplate mongoTemplate;

    @GetMapping("/users")
    public ResponseEntity<Page<User>> getAllUsers(@RequestParam int page) {
        return new ResponseEntity<>(adminService.getAllUsers(page), HttpStatus.OK);
    }
    @GetMapping("/users/{username}")
    public ResponseEntity<User> getByUsername(@PathVariable String username) {
        var user = adminService.getUser(username);
        return user.map(usr -> new ResponseEntity<>(usr, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
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
    public ResponseEntity<String> createStudent(@RequestBody Student student) {
        Student st = adminService.createStudent(student);
        if(Objects.isNull(st)) {return ResponseEntity.badRequest().body("Student already exists");}
        return new ResponseEntity<>("Student created", HttpStatus.CREATED);
    }
    @GetMapping("/students")
    public ResponseEntity<Page<Student>> getAllStudents(@RequestParam int page) {
        return new ResponseEntity<>(adminService.getAllStudents(page), HttpStatus.OK);
    }
    @PostMapping("/teachers")
    public ResponseEntity<String> createTeacher(@RequestBody Teacher teacher) {
        Teacher tc = adminService.createTeacher(teacher);
        if (Objects.isNull(tc))
            return ResponseEntity.badRequest().body("Teacher already exists");
        return new ResponseEntity<>("Teacher created", HttpStatus.CREATED);
    }
    @GetMapping("/teachers")
    public ResponseEntity<Page<Teacher>> getTeachers(@RequestParam int page) {
        return new ResponseEntity<>(adminService.getAllTeachers(page), HttpStatus.OK);
    }

    @GetMapping("/teachers/all")
    public ResponseEntity<List<Map<String, String>>> getAllTeacherNameAndUsername(){
        List<Map<String, String>> teachers = new ArrayList<>();
        List<Teacher> ls = mongoTemplate.find(Query.query(Criteria.where("role").is("TEACHER")), Teacher.class, "users");
        ls.forEach(teacher -> teachers.add(Map.of("username", teacher.getUsername(), "name", teacher.getName())));
        return ResponseEntity.ok(teachers);
    }
    @PutMapping("/students/{username}")
    public ResponseEntity<String> updateStudent(@PathVariable String username, @RequestBody Student student) throws IllegalAccessException {
        if(adminService.updateStudent(student, username) == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Student updated");
    }

    @PutMapping("/teachers/{username}")
    public ResponseEntity<String> updateTeacher(@PathVariable String username, @RequestBody Teacher teacher) throws IllegalAccessException {
        if(adminService.updateTeacher(teacher, username) == null){return ResponseEntity.notFound().build();}
        return ResponseEntity.ok("Teacher updated");
    }
}
