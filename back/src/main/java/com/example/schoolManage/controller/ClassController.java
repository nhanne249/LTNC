package com.example.schoolManage.controller;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.service.ClassService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/classes")
public class ClassController {
    private final ClassService classService;
    public ClassController(ClassService classService) {
        this.classService = classService;
    }
    @GetMapping
    public ResponseEntity<Page<Classroom>> getAllClasses(@RequestParam int page){
        return new ResponseEntity<>(classService.getAllClasses(page), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Classroom> createClass(@RequestBody Classroom classroom){
        return new ResponseEntity<>(classService.createClass(classroom), HttpStatus.OK);
    }
    @GetMapping("/{name}")
    public ResponseEntity<Optional<Classroom>> getClassByName(@PathVariable String name){
        return new ResponseEntity<>(classService.getClassByName(name), HttpStatus.OK);
    }
    @GetMapping("/teacher")
    public ResponseEntity<List<Classroom>> getClassTeacher(@RequestParam String username){
        return new ResponseEntity<>(classService.findByTeacher(username), HttpStatus.OK);
    }
    @GetMapping("/student")
    public ResponseEntity<List<Classroom>> getClassStudent(@RequestParam String username){
        return new ResponseEntity<>(classService.findByStudent(username), HttpStatus.OK);
    }
}
