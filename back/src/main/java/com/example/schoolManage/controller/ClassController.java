package com.example.schoolManage.controller;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.service.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;

@RestController
@RequestMapping("/classes")
@RequiredArgsConstructor
public class ClassController {
    private final ClassService classService;
    @GetMapping
    public ResponseEntity<Page<Classroom>> getAllClasses(@RequestParam int page){
        return new ResponseEntity<>(classService.getAllClasses(page), HttpStatus.OK);
    }
    @GetMapping("/{name}/students")
    public ResponseEntity<Page<Student>> getAllStudents(@PathVariable String name,@RequestParam int page){
        return new ResponseEntity<>(classService.getAllStudent(name, PageRequest.of(page, 10)), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<String> createClass(@RequestBody Classroom classroom){
        var cl = classService.createClass(classroom);
        if(cl == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>("Class created", HttpStatus.CREATED);
    }
    @PutMapping("/{name}")
    public ResponseEntity<String> updateClass(@RequestBody Classroom classroom, @PathVariable String name) throws IllegalAccessException {
        classService.updateClass(name, classroom);
        return new ResponseEntity<>("Class updated", HttpStatus.OK);
    }
    @GetMapping("/{name}")
    public ResponseEntity<Optional<Classroom>> getClassById(@PathVariable String name){
        return new ResponseEntity<>(classService.getClassByName(name), HttpStatus.OK);
    }
    @DeleteMapping("/{name}")
    public ResponseEntity<String> deleteClassByName(@PathVariable String name){
        classService.deleteClass(name);
        return ResponseEntity.ok("Class " + name + " has been deleted.");
    }
    @DeleteMapping
    public ResponseEntity<String> deleteAllClasses(){
        classService.deleteAllClasses();
        return ResponseEntity.ok("All classes has been deleted.");
    }
}
