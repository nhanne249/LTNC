package com.example.schoolManage.controller;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.service.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    @PostMapping
    public ResponseEntity<String> createClass(@RequestBody Classroom classroom){
        var cl = classService.createClass(classroom);
        if(cl == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>("Class created", HttpStatus.CREATED);
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
