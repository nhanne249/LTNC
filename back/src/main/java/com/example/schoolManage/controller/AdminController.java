package com.example.schoolManage.controller;


import com.example.schoolManage.model.course.Course;
import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.model.user.User;
import com.example.schoolManage.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @GetMapping("/all/users")
    public ResponseEntity<List<User>> allUser(){
        return new ResponseEntity<List<User>>(adminService.getAllUsers(), HttpStatus.OK);
    }
    @GetMapping("/{username}")
    public ResponseEntity<User> getUserBy(@PathVariable String username){
        return new ResponseEntity<User>(adminService.getUser(username), HttpStatus.OK);
    }
    @PostMapping("/register/student")
    public ResponseEntity<Student> addStudent(@RequestBody Student student){
        Student st = adminService.createStudent(student);
        if(Objects.isNull(st))
            return ResponseEntity.badRequest().build();
        return new ResponseEntity<Student>(st, HttpStatus.CREATED);
    }
    @PostMapping("/register/teacher")
    public ResponseEntity<Teacher> addTeacher(@RequestBody Teacher teacher){
        Teacher tc = adminService.createTeacher(teacher);
        if(Objects.isNull(tc))
            return ResponseEntity.badRequest().build();
        return new ResponseEntity<Teacher>(tc, HttpStatus.CREATED);
    }
    @DeleteMapping("/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username){
        adminService.deleteUser(username);
        return ResponseEntity.ok("deleted");
    }
    @PostMapping("/courses")
    public ResponseEntity<Course> addCourse(@RequestBody Course course){
        return new ResponseEntity<Course>(adminService.addCourse(course), HttpStatus.CREATED);
    }
    @DeleteMapping("/courses/{courseId}")
    public ResponseEntity<String> removeCourse(@PathVariable String courseId){
        adminService.deleteCourse(courseId);
        return ResponseEntity.ok("course removed");
    }

    @PostMapping("/class")
    public ResponseEntity<Classroom> addClass(@RequestBody Classroom classroom){
        return new ResponseEntity<Classroom>(adminService.addClass(classroom),HttpStatus.CREATED);
    }
}
