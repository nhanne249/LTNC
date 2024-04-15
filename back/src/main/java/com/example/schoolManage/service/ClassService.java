package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.repository.ClassRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassService {
    private final ClassRepository classRepository;

    public ClassService(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }
    public Page<Classroom> getAllClasses(int page){
        return classRepository.findAll(PageRequest.of(page-1, 10));
    }
    public Classroom createClass(Classroom classroom){
        if(classRepository.findBySubject(classroom.getSubject()).isPresent()){
            System.out.println("SUBJECT EXISTED");
            return null;
        }
        return classRepository.insert(new Classroom(classroom.getClassId(),
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
        return classRepository.customFindByStudent(username);
    }

}
