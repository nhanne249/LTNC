package com.example.schoolManage.controller;

import com.example.schoolManage.model.course.Classroom;
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

    // classId khong the o dang string ma phai o dang objectId hoac can 1 key khac de xet
    @PutMapping("/{username}/classes/{classId}/enroll")
    public ResponseEntity<String> enrollClass(@PathVariable String classId, @PathVariable String username) {
        return studentService.enrollClass(username ,classId);
    }

    @PutMapping ("/{username}/classes/{classId}/unenroll")
    public ResponseEntity<String> UnenrollClass(@PathVariable String classId, @PathVariable String username) {
        return studentService.unrollClass(username ,classId);
    }

    @GetMapping("/{username}/classes/{subject}")
    public ResponseEntity<List<Classroom>> getAllClassSubject(@PathVariable String subject) {
        return new ResponseEntity<>(studentService.getAllClassSubject(subject), HttpStatus.OK);
    }

}

