package com.example.schoolManage.controller;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.review.Review;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

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
    public ResponseEntity<String> updateStudent(@RequestBody Student update, @PathVariable String username) {
        var st = studentService.updateStudent(username,update);
        return st.map(student -> new ResponseEntity<>("Student updated", HttpStatus.OK)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{username}/classes/{className}/enroll")
    public ResponseEntity<String> enrollClass(@PathVariable String className, @PathVariable String username) {
        var cl = studentService.enrollClass(username, className);
        return cl.map(classroom -> new ResponseEntity<>("Class enrolled", HttpStatus.OK)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping ("/{username}/classes/{className}/unenroll")
    public ResponseEntity<String> unenrollClass(@PathVariable String className, @PathVariable String username) {
        var cl = studentService.unenrollClass(username, className);
        return cl.map(classroom -> new ResponseEntity<>("Class urenrolled", HttpStatus.OK)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{username}/classes/{className}/rate")
    public ResponseEntity<String> rate(@RequestBody Review review, @PathVariable String className, @PathVariable String username) {
        if (review.getScore()==null) return ResponseEntity.ok("NEED ADD SCORE");
        else if (review.getReviewBody()==null) return ResponseEntity.ok("NEED ADD REVIEW");
        return studentService.rate(review, className, username);
    }
}

