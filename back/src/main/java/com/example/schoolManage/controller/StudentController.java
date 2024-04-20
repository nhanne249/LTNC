package com.example.schoolManage.controller;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.review.Review;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.service.StudentService;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.json.JSONParser;
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
        return new ResponseEntity<>(studentService.enrollClass(username ,className), HttpStatus.OK);

    }

    @PutMapping ("/{username}/classes/{className}/unenroll")
    public ResponseEntity<String> unenrollClass(@PathVariable String className, @PathVariable String username) {
        return new ResponseEntity<>(studentService.unenrollClass(username ,className), HttpStatus.OK);

    }


    // xem lai phan requestBody
    @PostMapping("/{username}/classes/{teacher_username}/rate")
    public ResponseEntity<String> rate(@RequestBody Review review, @PathVariable String teacher_username, @PathVariable String username) {
        if (review.getScore()==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NEED ADD SCORE");
        else if (review.getReviewBody()==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NEED ADD REVIEW");
        else if (review.getScore()>5 || review.getScore()<0) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("WRONG SCORE REVIEW (0<=SCORE<=5)");
        return new ResponseEntity<>(studentService.rate(review, teacher_username, username), HttpStatus.OK);
    }
}

