package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService{
    private final UserRepository userRepository;
    private final ClassRepository classRepository;

    public StudentService(UserRepository userRepository, ClassRepository classRepository) {
        this.userRepository = userRepository;
        this.classRepository = classRepository;
    }
//    public List<Classroom> getAllClassrooms(String username){return classRepository.findAllByStudent(username);}
//    public Classroom enrollClassroom(String username, String classId){
//        Optional<Classroom> classroom = classRepository.findById(classId);
//        if(classroom.isPresent()){
//            classroom.get().getStudents().add(username);
//            return classroom.get();
//        }
//        return null;
//    }
}
