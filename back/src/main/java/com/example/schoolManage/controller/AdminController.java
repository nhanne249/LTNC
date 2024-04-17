package com.example.schoolManage.controller;

import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.model.user.User;
import com.example.schoolManage.service.AdminService;
import com.example.schoolManage.service.StudentService;
import com.example.schoolManage.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final TeacherService teacherService;
    private final StudentService studentService;

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
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        return new ResponseEntity<>(adminService.createStudent(student), HttpStatus.CREATED);
    }
    @GetMapping("/students")
    public ResponseEntity<Page<Student>> getAllStudents(@RequestParam int page) {
        return new ResponseEntity<>(adminService.getAllStudents(page), HttpStatus.OK);
    }
    @PostMapping("/teachers")
    public ResponseEntity<Teacher> createTeacher(@RequestBody Teacher teacher) {
        Teacher tc = adminService.createTeacher(teacher);
        if (Objects.isNull(tc))
            return ResponseEntity.badRequest().build();
        return new ResponseEntity<>(tc, HttpStatus.CREATED);
    }
    @GetMapping("/teachers")
    public ResponseEntity<Page<Teacher>> getAllTeachers(@RequestParam int page) {
        return new ResponseEntity<>(adminService.getAllTeachers(page), HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<User> getInfo() {
        var usr = adminService.getUser(getLoggedInUserDetails().getUsername());
        return usr.map(user -> new ResponseEntity<>(user, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @PutMapping("/student/update")
    public ResponseEntity<Student> updateStudent(@RequestBody Student update) {
        var usr = studentService.updateStudent(getLoggedInUserDetails().getUsername(), update);
        return usr.map(user -> new ResponseEntity<>(user, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @PutMapping("/teacher/update")
    public ResponseEntity<Teacher> updateTeacher(@RequestBody Teacher update) {
        var tc = teacherService.updateTeacher(getLoggedInUserDetails().getUsername(), update);
        return tc.map(teacher -> new ResponseEntity<>(teacher, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public UserDetails getLoggedInUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            return (UserDetails) authentication.getPrincipal();
        }
        return null;
    }
}
