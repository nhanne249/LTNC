package com.example.schoolManage.controller;

import com.example.schoolManage.model.Faculty;
import com.example.schoolManage.repository.FacultyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/faculties")
@RequiredArgsConstructor
public class FacultyController {
    private final FacultyRepository facultyRepository;
    @GetMapping
    public ResponseEntity<List<Faculty>> getFaculties() {
        return new ResponseEntity<>(facultyRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> createFaculty(@RequestBody Faculty faculty) {

        if(facultyRepository.findByName(faculty.getName()).isPresent()) {return ResponseEntity.badRequest().build();}
        facultyRepository.save(faculty);
        return new ResponseEntity<>(faculty.getName() + " faculty created", HttpStatus.CREATED);
    }
    @PutMapping("/{faculty}")
    public ResponseEntity<String> addSubject(@RequestBody String subject, @PathVariable String faculty) {
        var fal = facultyRepository.findByName(faculty);
        if (fal.isPresent()) {
            fal.get().getSubjects().add(subject);
            facultyRepository.save(fal.get());
            return ResponseEntity.ok(subject + " added to "+ fal.get().getName());
        }
        else return new ResponseEntity<>("Faculty not found",HttpStatus.NOT_FOUND);
    }
    @PutMapping("/{faculty}/{subject}")
    public ResponseEntity<String> removeSubject(@PathVariable String faculty, @PathVariable String subject) {
        var fac = facultyRepository.findByName(faculty);
        if (fac.isPresent()) {
            fac.get().getSubjects().remove(subject);
            facultyRepository.save(fac.get());
            return new ResponseEntity<>(subject + " removed from " + fac.get() , HttpStatus.OK);
        }
        else return new ResponseEntity<>("Faculty not found", HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("/{faculty}")
    public ResponseEntity<String> deleteFaculty(@PathVariable String faculty) {
        facultyRepository.deleteByName(faculty);
        return new ResponseEntity<>("Faculty deleted",HttpStatus.OK);
    }
}
