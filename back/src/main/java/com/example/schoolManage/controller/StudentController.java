package com.example.schoolManage.controller;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.review.Review;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/{username}")
    public ResponseEntity<Optional<Student>> getInfoStudent(@PathVariable String username) {
        Optional<Student> st = studentService.getStudent(username);
        if (st.isPresent()) {
            return new ResponseEntity<>(studentService.getStudent(username), HttpStatus.OK);
        }
        else return new ResponseEntity<>(st, HttpStatus.NOT_FOUND);

    }

    @GetMapping("/{username}/classes")
    public ResponseEntity<List<Classroom>> getAllClass(@PathVariable String username) {
        return new ResponseEntity<>(studentService.getAllClassrooms(username), HttpStatus.OK);
    }

    @PutMapping("/{username}")
    public ResponseEntity<Student> updateInfo(@RequestBody Student update, @PathVariable String username) {
        return new ResponseEntity<>(studentService.updateInfo(update, username), HttpStatus.OK);
    }

    @PutMapping("/{username}/classes/{className}/enroll")
    public ResponseEntity<String> enrollClass(@PathVariable String className, @PathVariable String username) {
        return studentService.enrollClass(username ,className);
    }

    @PutMapping ("/{username}/classes/{className}/unenroll")
    public ResponseEntity<String> unenrollClass(@PathVariable String className, @PathVariable String username) {
        return studentService.unrollClass(username ,className);
    }

    @PostMapping("/{username}/classes/{className}/rate")
    public ResponseEntity<String> rate(@RequestBody Review review, @PathVariable String className, @PathVariable String username) {
        if (review.getScore()==null) return ResponseEntity.ok("NEED ADD SCORE");
        else if (review.getReviewBody()==null) return ResponseEntity.ok("NEED ADD REVIEW");
        return studentService.rate(review, className, username);
    }
}

