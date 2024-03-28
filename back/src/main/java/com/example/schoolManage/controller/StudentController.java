package com.example.schoolManage.controller;

import com.example.schoolManage.model.course.Course;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.service.StudentService.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
@PreAuthorize("hasAuthority('STUDENT')")
public class StudentController {
    @Autowired
    private StudentService studentService;
    @GetMapping
    public ResponseEntity<List<Student>> all(){
        return new ResponseEntity<List<Student>>(studentService.getAllStudent(), HttpStatus.OK);
    }
    @GetMapping("/{username}")
    public ResponseEntity<Optional<Student>> get(@PathVariable String username){
        return new ResponseEntity<Optional<Student>>(studentService.getStudentByUsername(username), HttpStatus.OK);
    }
    @PutMapping("/{username}")
    public ResponseEntity<Student> update(@PathVariable String username, @RequestBody Student student){
        return new ResponseEntity<Student>(studentService.updateStudentByUserName(username, student), HttpStatus.OK);
    }
    @PostMapping("/{username}/addCourse")
    public ResponseEntity<Course> addCourse(@PathVariable String username, @RequestBody Course course){
        return new ResponseEntity<Course>(studentService.enrollCourse(username, course), HttpStatus.OK);
    }
    @DeleteMapping("/{username}/{courseName}")
    public ResponseEntity<String> removeCourse(@PathVariable String username, @PathVariable String courseName){
        studentService.disenrollCourse(username, courseName);
        return ResponseEntity.ok("course unenrolled");
    }


    public UserDetails getLoggedInUserDetails(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.getPrincipal() instanceof UserDetails){
            return (UserDetails) authentication.getPrincipal();
        }
        return null;
    }
}
