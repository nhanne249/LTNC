package com.example.schoolManage.controller;

import com.example.schoolManage.model.course.Course;
import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.model.user.User;
import com.example.schoolManage.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/all/users")
    public ResponseEntity<List<User>> allUser() {
        return new ResponseEntity<>(adminService.getAllUsers(), HttpStatus.OK);
    }
    @GetMapping("/all/users/{page}")
    public ResponseEntity<Page<User>> pageUsers(@PathVariable int page){
        return new ResponseEntity<>(adminService.getUsersPage(page), HttpStatus.OK);
    }
    @GetMapping("/{username}")
    public ResponseEntity<Optional<User>> getUserBy(@PathVariable String username) {
        return new ResponseEntity<>(adminService.getUser(username), HttpStatus.OK);
    }

    @PostMapping("/student")
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        Student st = adminService.createStudent(student);
        if (Objects.isNull(st))
            return ResponseEntity.badRequest().build();
        return new ResponseEntity<>(st, HttpStatus.CREATED);
    }

    @PostMapping("/teacher")
    public ResponseEntity<Teacher> addTeacher(@RequestBody Teacher teacher) {
        Teacher tc = adminService.createTeacher(teacher);
        if (Objects.isNull(tc))
            return ResponseEntity.badRequest().build();
        return new ResponseEntity<>(tc, HttpStatus.CREATED);
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<Optional<User>> deleteUser(@PathVariable String username) {
        return new ResponseEntity<>(adminService.deleteUser(username), HttpStatus.OK);
    }

    @PostMapping("/courses")
    public ResponseEntity<Course> addCourse(@RequestBody Course course) {
        return new ResponseEntity<Course>(adminService.addCourse(course), HttpStatus.CREATED);
    }

    @DeleteMapping("/courses/{courseId}")
    public ResponseEntity<String> removeCourse(@PathVariable String courseId) {
        adminService.deleteCourse(courseId);
        return ResponseEntity.ok("course removed");
    }

    @PostMapping("/class")
    public ResponseEntity<Classroom> addClass(@RequestBody Classroom classroom) {
        return new ResponseEntity<Classroom>(adminService.addClass(classroom), HttpStatus.CREATED);
    }
}
