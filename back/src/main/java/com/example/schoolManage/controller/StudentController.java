//package com.example.schoolManage.controller;
//
//import com.example.schoolManage.model.course.Course;
//import com.example.schoolManage.model.user.Student;
//import com.example.schoolManage.service.StudentService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/student")
//public class StudentController {
//    @Autowired
//    private StudentService studentService;
//
//    @GetMapping("/info")
//    public ResponseEntity<Student> getInfo() {
//        return new ResponseEntity<Student>(studentService.getStudentByUsername(getLoggedInUserDetails().getUsername()),
//                HttpStatus.OK);
//    }
//
//    @PutMapping("/update")
//    public ResponseEntity<Student> update(@RequestBody Student student) {
//        return new ResponseEntity<Student>(
//                studentService.updateStudentByUserName(getLoggedInUserDetails().getUsername(), student), HttpStatus.OK);
//    }
//
//    @GetMapping("/courses")
//    public ResponseEntity<List<Course>> getAllCourses() {
//        return new ResponseEntity<List<Course>>(studentService.getAllCourses(getLoggedInUserDetails().getUsername()),
//                HttpStatus.OK);
//    }
//
//    @PostMapping("/courses/{courseId}")
//    public ResponseEntity<Course> enrollCourse(@PathVariable String courseId) {
//        return new ResponseEntity<Course>(studentService.enrollCourse(getLoggedInUserDetails().getUsername(), courseId),
//                HttpStatus.OK);
//    }
//
//    @DeleteMapping("/courses/{courseId}")
//    public ResponseEntity<String> removeCourse(@PathVariable String courseId) {
//        studentService.disenrollCourse(getLoggedInUserDetails().getUsername(), courseId);
//        return ResponseEntity.ok("course unenrolled");
//    }
//
//    public UserDetails getLoggedInUserDetails() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
//            return (UserDetails) authentication.getPrincipal();
//        }
//        return null;
//    }
//}
package com.example.schoolManage.controller;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/{username}")
    public ResponseEntity<Optional<Student>> getStudent(@PathVariable String username) {
        return new ResponseEntity<>(studentService.getStudent(username), HttpStatus.OK);
    }

    @GetMapping("/{username}/classes")
    public ResponseEntity<List<Classroom>> getAllClass(@PathVariable String username) {
        return new ResponseEntity<>(studentService.getAllClassrooms(username), HttpStatus.OK);
    }

    @PutMapping("/{username}")
    public ResponseEntity<Student> updateInfo(@RequestBody Student update, @PathVariable String username) {
        return new ResponseEntity<>(studentService.updateInfo(update, username), HttpStatus.OK);
    }

//    @PutMapping("/{username}/classes/{classId}/enroll")
//    public ResponseEntity<String> enrollClass(@PathVariable String classId, @PathVariable String username) {
//        studentService.enrollClass(username ,classId);
//        return ResponseEntity.ok("class enrolled");
//    }
//
//    @PutMapping ("/{username}/classes/{classId}/unenroll")
//    public ResponseEntity<String> UnenrollClass(@PathVariable String classId, @PathVariable String username) {
//        studentService.unrollClass(username ,classId);
//        return ResponseEntity.ok("class unrolled");
//    }

}

