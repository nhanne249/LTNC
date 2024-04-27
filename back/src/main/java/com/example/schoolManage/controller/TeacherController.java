package com.example.schoolManage.controller;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teachers")
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherService teacherService;


    @GetMapping("/{username}")
    public ResponseEntity<Teacher> getTeacher(@PathVariable String username) {
        var teacher = teacherService.getTeacher(username);
        return teacher.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{username}")
    public ResponseEntity<String> updateTeacher(@PathVariable String username, @RequestBody Teacher update) {
        var tc = teacherService.updateTeacher(username, update);
        if(tc.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Teacher updated");
    }

    @GetMapping("/{username}/classes")
    public ResponseEntity<List<Classroom>> getAllClasses(@PathVariable String username) {
        return new ResponseEntity<>(teacherService.getAllClasses(username), HttpStatus.OK);
    }
    @PostMapping("/{classname}/scores")
    public ResponseEntity<String> giveScore(@RequestBody List<Double> ls, @PathVariable String classname) {
        teacherService.giveScore(classname, ls);
        return ResponseEntity.ok("Score gived to " + classname);
    }
}