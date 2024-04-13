package com.example.schoolManage.controller;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teacher")
public class TeacherController {
    @Autowired
    TeacherService teacherService;

    @GetMapping("/classes")
    public ResponseEntity<List<Classroom>> allClasses() {
        return new ResponseEntity<List<Classroom>>(teacherService.getAllClasses(getLoggedInUserDetails().getUsername()),
                HttpStatus.OK);
    }

    @PostMapping("/classes/{classId}")
    public ResponseEntity<Classroom> addClass(@PathVariable String classId) {
        return new ResponseEntity<Classroom>(teacherService.addClass(getLoggedInUserDetails().getUsername(), classId),
                HttpStatus.CREATED);
    }

    public UserDetails getLoggedInUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            return (UserDetails) authentication.getPrincipal();
        }
        return null;
    }
}
