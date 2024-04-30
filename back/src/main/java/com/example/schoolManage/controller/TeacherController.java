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
@RequestMapping("/teacher")
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherService teacherService;


    @GetMapping("/info")
    public ResponseEntity<Teacher> getTeacher() {
        var teacher = teacherService.getTeacher(getLoggedInUserDetails().getUsername());
        return teacher.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/info")
    public ResponseEntity<String> updateTeacher(@RequestBody Teacher update) throws IllegalAccessException {
        var tc = teacherService.updateTeacher(getLoggedInUserDetails().getUsername(), update);
        if(tc.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Teacher updated");
    }

    @GetMapping("/classes")
    public ResponseEntity<List<Classroom>> getAllClasses() {
        return new ResponseEntity<>(teacherService.getAllClasses(getLoggedInUserDetails().getUsername()), HttpStatus.OK);
    }
    @PostMapping("/{classname}/scores")
    public ResponseEntity<String> giveScore(@RequestBody List<Double> ls, @PathVariable String classname) {
        teacherService.giveScore(classname, ls);
        return ResponseEntity.ok("Score gived to " + classname);
    }
    public UserDetails getLoggedInUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            return (UserDetails) authentication.getPrincipal();
        }
        return null;
    }
}