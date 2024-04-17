package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {
    private final UserRepository userRepository;
    private final ClassRepository classRepository;

    public TeacherService(UserRepository userRepository, ClassRepository classRepository) {
        this.userRepository = userRepository;
        this.classRepository = classRepository;
    }


    public List<Classroom> getAllClasses(String teacherUsername) {
        return classRepository.findAllByTeacher(teacherUsername);
    }

    public Optional<Teacher> getTeacher(String username) {
        return userRepository.findTeacherByUsername(username);
    }

    public Optional<Teacher> updateTeacher(String teacherUsername, Teacher update) {
        var teacher = userRepository.findTeacherByUsername(teacherUsername);
        if(teacher.isEmpty()) {return Optional.empty();}
        if(update.getName() != null ) teacher.get().setName(update.getName());
        if(update.getEmail()!= null) teacher.get().setEmail(update.getEmail());
        if(update.getPhone()!= null) teacher.get().setPhone(update.getPhone());
        return Optional.of(userRepository.save(teacher.get()));
    }
}
