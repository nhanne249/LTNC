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
@RequestMapping("/student")
@PreAuthorize("hasAuthority('STUDENT')")
public class StudentController {
    @Autowired
    private StudentService studentService;
    @GetMapping("/info")
    public ResponseEntity<Student> getInfo(){
        return new ResponseEntity<Student>(studentService.getStudentByUsername(getLoggedInUserDetails().getUsername()), HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<Student> update(@RequestBody Student student){
        return new ResponseEntity<Student>(studentService.updateStudentByUserName(getLoggedInUserDetails().getUsername(), student), HttpStatus.OK);
    }
    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses(){
        return new ResponseEntity<List<Course>>(studentService.getAllCourses(getLoggedInUserDetails().getUsername()), HttpStatus.OK);
    }
    @PostMapping("/courses/{courseId}")
    public ResponseEntity<Course> enrollCourse(@PathVariable String courseId){
        return new ResponseEntity<Course>(studentService.enrollCourse(getLoggedInUserDetails().getUsername(),courseId), HttpStatus.OK);
    }
    @DeleteMapping("/courses/{courseId}")
    public ResponseEntity<String> removeCourse(@PathVariable String courseId){
        studentService.disenrollCourse(getLoggedInUserDetails().getUsername(), courseId);
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
