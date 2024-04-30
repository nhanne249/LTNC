package com.example.schoolManage.controller;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.review.Review;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping("/info")
    public ResponseEntity<Student> getStudent() {
        Optional<Student> st = studentService.getStudent(getLoggedInUserDetails().getUsername());
        return st.map(student -> new ResponseEntity<>(student, HttpStatus.OK)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/classes")
    public ResponseEntity<List<Classroom>> getAllClass() {
        return new ResponseEntity<>(studentService.getAllClassrooms(getLoggedInUserDetails().getUsername()), HttpStatus.OK);
    }

    @PutMapping("/info")
    public ResponseEntity<String> updateStudent(@RequestBody Student update) throws IllegalAccessException {
        var st = studentService.updateStudent(getLoggedInUserDetails().getUsername(), update);
        return st.map(student -> new ResponseEntity<>("Student updated", HttpStatus.OK)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{className}/enroll")
    public ResponseEntity<String> enrollClass(@PathVariable String className) {
        return new ResponseEntity<>(studentService.enrollClass(getLoggedInUserDetails().getUsername(), className), HttpStatus.OK);

    }

    @PutMapping ("/{className}/unenroll")
    public ResponseEntity<String> unenrollClass(@PathVariable String className) {
        return new ResponseEntity<>(studentService.unenrollClass(getLoggedInUserDetails().getUsername(),className), HttpStatus.OK);

    }


    // xem lai phan requestBody
    @PutMapping("/{teacher_username}/rate")
    public ResponseEntity<String> rate(@RequestBody Review review, @PathVariable String teacher_username) {
        if (review.getRating()==null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NEED ADD SCORE");
        else if (review.getContent()==null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NEED ADD REVIEW");
        else if (review.getRating()>5 || review.getRating()<0) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("WRONG SCORE REVIEW (0<=SCORE<=5)");
        return new ResponseEntity<>(studentService.rate(review, teacher_username, getLoggedInUserDetails().getUsername()), HttpStatus.OK);
    }
    public UserDetails getLoggedInUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            return (UserDetails) authentication.getPrincipal();
        }
        return null;
    }
}

