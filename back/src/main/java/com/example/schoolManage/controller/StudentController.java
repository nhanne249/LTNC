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
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/{username}")
    public ResponseEntity<Student> getStudent(@PathVariable String username) {
        Optional<Student> st = studentService.getStudent(username);
        return st.map(student -> new ResponseEntity<>(student, HttpStatus.OK)).orElseGet(() -> ResponseEntity.notFound().build());

    }

    @GetMapping("/{username}/classes")
    public ResponseEntity<List<Classroom>> getAllClass(@PathVariable String username) {
        return new ResponseEntity<>(studentService.getAllClassrooms(username), HttpStatus.OK);
    }

    @PutMapping("/{username}")
    public ResponseEntity<Student> updateStudent(@RequestBody Student update, @PathVariable String username) {
        var st = studentService.updateStudent(update, username);
        return st.map(student -> new ResponseEntity<>(student, HttpStatus.OK)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{username}/classes/{className}/enroll")
    public ResponseEntity<Classroom> enrollClass(@PathVariable String className, @PathVariable String username) {
        var cl = studentService.enrollClass(username, className);
        return cl.map(classroom -> new ResponseEntity<>(classroom, HttpStatus.OK)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping ("/{username}/classes/{className}/unenroll")
    public ResponseEntity<Classroom> unenrollClass(@PathVariable String className, @PathVariable String username) {
        var cl = studentService.unenrollClass(username, className);
        return cl.map(classroom -> new ResponseEntity<>(classroom, HttpStatus.OK)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{username}/classes/{className}/rate")
    public ResponseEntity<String> rate(@RequestBody Review review, @PathVariable String className, @PathVariable String username) {
        if (review.getScore()==null) return ResponseEntity.ok("NEED ADD SCORE");
        else if (review.getReviewBody()==null) return ResponseEntity.ok("NEED ADD REVIEW");
        return studentService.rate(review, className, username);
    }
}

