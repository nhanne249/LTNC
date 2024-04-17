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

    @GetMapping("/{name}")
    public ResponseEntity<Faculty> getFaculty(@PathVariable String name) {
        return facultyRepository.findByName(name)
                .map(faculty -> new ResponseEntity<>(faculty, HttpStatus.OK))
                .orElseGet(()-> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Faculty> createFaculty(@RequestBody Faculty faculty) {
        return new ResponseEntity<>(facultyRepository.save(faculty), HttpStatus.CREATED);
    }
    @PutMapping("/{faculty}")
    public ResponseEntity<Faculty> addSubject(@RequestBody String subject, @PathVariable String faculty) {
        var fal = facultyRepository.findByName(faculty);
        if (fal.isPresent()) {
            fal.get().getSubjects().add(subject);
            facultyRepository.save(fal.get());
            return new ResponseEntity<>(fal.get(), HttpStatus.OK);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PutMapping("/{faculty}/{subject}")
    public ResponseEntity<Faculty> removeSubject(@PathVariable String faculty, @PathVariable String subject) {
        var fac = facultyRepository.findByName(faculty);
        if (fac.isPresent()) {
            fac.get().getSubjects().remove(subject);
            facultyRepository.save(fac.get());
            return new ResponseEntity<>(fac.get(), HttpStatus.OK);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("/{faculty}")
    public ResponseEntity<String> deleteFaculty(@PathVariable String faculty) {
        facultyRepository.deleteByName(faculty);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
