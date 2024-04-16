package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.repository.ClassRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassService {
    private final ClassRepository classRepository;

    public ClassService(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }
    public Page<Classroom> getAllClasses(int page){
        return classRepository.findAll(PageRequest.of(page-1, 10));
    }
    public Optional<Classroom> getClassById(String id){return classRepository.findById(id);}
    public Classroom createClass(@NotNull Classroom classroom){
        if(classRepository.findBySubject(classroom.getSubject()).isPresent()){
            System.out.println("SUBJECT EXISTED");
            return null;
        }
        return classRepository.insert(new Classroom(classroom.getName(),
                classroom.getSubject(),
                classroom.getPlace(),
                classroom.getDay(),
                classroom.getTime(),
                classroom.getTeacher()));
    }
    public List<Classroom> findByTeacher(String username){
        return classRepository.findAllByTeacher(username);
    }
    public List<Classroom> findByStudent(String username){
        return classRepository.findAllByStudent(username);
    }

}
