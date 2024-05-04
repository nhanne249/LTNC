package com.example.schoolManage.controller;

import com.example.schoolManage.model.files.Resource;
import com.example.schoolManage.repository.ResourceRepository;
import com.example.schoolManage.utils.FileUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/resources")
@RequiredArgsConstructor
public class ResourceController {
    private final ResourceRepository resourceRepository;
    @PostMapping("/{className}")
    public ResponseEntity<String> uploadResource(@RequestParam("file") MultipartFile file, @PathVariable String className) throws IOException {
        if(resourceRepository.findByNameAndClassroom(file.getOriginalFilename(),className).isPresent()){
            return ResponseEntity.badRequest().body("File already exists in this classroom");
        }
        resourceRepository.save(new Resource(file.getOriginalFilename(), className, file.getContentType(), FileUtils.compress(file.getBytes())));
        return ResponseEntity.ok("Resource upload successful");
    }
    @GetMapping("/{className}/all")
    public ResponseEntity<List<String>> getResourcesByClass(@PathVariable String className) {
        List<Resource> rs = resourceRepository.findAllByClassroom(className);
        List<String> ls = new ArrayList<>();
        rs.forEach(resource -> ls.add(resource.getName()));
        return new ResponseEntity<>(ls, HttpStatus.OK);
    }
    @GetMapping("/{classname}/{name}")
    public ResponseEntity<byte[]> getResource(@PathVariable String name, @PathVariable String classname) {
        var f =  resourceRepository.findByNameAndClassroom(name, classname);
        return f.map(resource -> ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf(resource.getType()))
                .body(FileUtils.decompress(resource.getData())))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{classname}/{name}")
    public ResponseEntity<String> deleteResource(@PathVariable String name, @PathVariable String classname) {
        resourceRepository.deleteByNameAndClassroom(name, classname);
        return ResponseEntity.ok("Resource deleted successfully");
    }
}
