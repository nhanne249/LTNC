package com.example.schoolManage.controller;

import com.example.schoolManage.model.shared.Faculty;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.FacultyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@RestController
@RequestMapping("/faculties")
@RequiredArgsConstructor
public class FacultyController {
    private final FacultyRepository facultyRepository;
    private final ClassRepository classRepository;
    @GetMapping
    public ResponseEntity<List<Faculty>> getFaculties() {
        return new ResponseEntity<>(facultyRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> createFaculty(@RequestBody Faculty faculty) {
        if (facultyRepository.findByName(faculty.getName()).isPresent()) {
            return ResponseEntity.badRequest().body("Faculty already exists");
        }
        if(faculty.getSubjects()== null){
            faculty.setSubjects(new ArrayList<>());
        }
        facultyRepository.save(faculty);
        return new ResponseEntity<>(faculty.getName() + " faculty created", HttpStatus.CREATED);
    }

    @PutMapping("/{faculty}")
    public ResponseEntity<String> addSubject(@RequestBody String subject, @PathVariable String faculty) {
        var fal = facultyRepository.findByName(faculty);
        if (fal.isPresent()) {
            if(fal.get().getSubjects().contains(subject)) return new ResponseEntity<>("Subject existed", HttpStatus.BAD_REQUEST);
            fal.get().getSubjects().add(subject.replace("\"", ""));
            facultyRepository.save(fal.get());
            return ResponseEntity.ok(subject.replace("\"", "") + " added to " + fal.get().getName());
        } else
            return new ResponseEntity<>("Faculty not found", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{faculty}/{subject}")
    public ResponseEntity<String> removeSubject(@PathVariable String faculty, @PathVariable String subject) {
        var fac = facultyRepository.findByName(faculty);
        if (fac.isPresent()) {
            if(!classRepository.findAllBySubject(subject).isEmpty()) {return ResponseEntity.badRequest().body("Subject is in a class");}
            fac.get().getSubjects().remove(subject);
            facultyRepository.save(fac.get());
            return new ResponseEntity<>(subject + " removed from " + fac.get(), HttpStatus.OK);
        } else
            return new ResponseEntity<>("Faculty not found", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{faculty}")
    public ResponseEntity<String> deleteFaculty(@PathVariable String faculty) {
        var optionalFaculty = facultyRepository.findByName(faculty);
        if(optionalFaculty.isEmpty()) {return new ResponseEntity<>("Faculty not found", HttpStatus.NOT_FOUND);}
        AtomicBoolean subjectInUse = new AtomicBoolean(false);
        optionalFaculty.get().getSubjects().forEach(subject->{
            if(!classRepository.findAllBySubject(subject).isEmpty()){
                subjectInUse.set(true);
            }
        });
        if(subjectInUse.get()) return ResponseEntity.badRequest().body("Subject is in a active class");
        facultyRepository.deleteByName(faculty);
        return new ResponseEntity<>("Faculty deleted", HttpStatus.OK);
    }
}
