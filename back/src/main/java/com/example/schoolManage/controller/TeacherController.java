package com.example.schoolManage.controller;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.service.TeacherService;
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
public class TeacherController {
    @Autowired
    TeacherService teacherService;
// GET info : /teacher/info
// PUT info : /teacher/info {Name, Email, phoneNumber}
// GET classes : /teacher/classes
    // @GetMapping("/classes")
    // public ResponseEntity<List<Classroom>> allClasses() {
    // return new
    // ResponseEntity<List<Classroom>>(teacherService.getAllClasses(getLoggedInUserDetails().getUsername()),
    // HttpStatus.OK);
    // }

    @PostMapping("/classes")
    public ResponseEntity<Classroom> addClass(@RequestBody Classroom newClass) {
        return new ResponseEntity<Classroom>(teacherService.addClass(getLoggedInUserDetails().getUsername(), newClass),
                HttpStatus.CREATED);
    }

    @GetMapping("/{username}")
    public ResponseEntity<Teacher> getTeacher(@PathVariable String username) {
        Teacher teacher = teacherService.searchTeacher(username);
        if (teacher != null) {
            return ResponseEntity.ok(teacher);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{username}")
    public ResponseEntity<Void> updateInfo(@PathVariable String username, @RequestParam String name,
            @RequestParam String email, @RequestParam String phoneNumber) {
        Teacher teacher = teacherService.searchTeacher(username);
        teacherService.updateTeacherInfo(username, name, email, phoneNumber);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/classes")
    public ResponseEntity<List<Classroom>> getAllClasses(@PathVariable String username) {
        List<Classroom> teachingClass = teacherService.getAllClasses(username);
        if (teachingClass != null) {
            return ResponseEntity.ok(teachingClass);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/class")
    public ResponseEntity<Classroom> getOneClass(@PathVariable String username, @PathVariable String classId) {
        Classroom classroom = teacherService.getClass(username, classId);
        if (classroom != null) {
            return ResponseEntity.ok(classroom);
        }
        return ResponseEntity.notFound().build();
    }


//    @PostMapping("/scores")
//    public ResponseEntity<Void> giveScore(@PathVariable String username, @RequestParam Course course,
//            @RequestParam String classId, @RequestParam String studentId, @RequestParam double score) {
//        teacherService.giveScore(username, course, classId, studentId, score);
//        return ResponseEntity.ok().build();
//    }

    public UserDetails getLoggedInUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            return (UserDetails) authentication.getPrincipal();
        }
        return null;
    }
}
