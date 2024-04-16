package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicReference;
@Service
public class TeacherService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ClassService classService;
    @Autowired
    ClassRepository classRepository;

    public List<Classroom> getAllClasses(String teacherUsername) {
        Teacher teacher = userRepository.findTeacherByUsername(teacherUsername).orElseThrow();
        if (teacher != null) {
            return classRepository.findAllByTeacher(teacherUsername);
        }
        return null;
    }

    public Classroom getClass(String teacherUsername, String classId) {
        Teacher teacher = userRepository.findTeacherByUsername(teacherUsername).orElseThrow();
        if (teacher != null) {
            Classroom classroom = classRepository.findBySubject(classId).orElseThrow();
        }
        return null;
    }

    public Teacher searchTeacher(String username) {
        return userRepository.findTeacherByUsername(username).orElseThrow();
    }

    public Classroom addClass(String teacherUsername, Classroom newClass) {
        Teacher teacher = userRepository.findTeacherByUsername(teacherUsername).orElseThrow();
        if (!classRepository.findById(newClass.getId().toString()).isPresent()) {

            Classroom class_result = new Classroom(newClass.getId().toString(), newClass.getSubject(), newClass.getPlace(), newClass.getDay(), newClass.getTime(), newClass.getTeacher());
            classRepository.save(class_result);
            return class_result;
        }
        return null;
    }

    public Teacher getTeacherInfo(String teacherUsername) {
        Teacher teacher = userRepository.findTeacherByUsername(teacherUsername).orElseThrow();
        if (teacher != null) {
            return teacher;
        }
        return null;
    }

    public void updateTeacherInfo(String teacherUsername, String name, String email, String phoneNumber) {
        Teacher teacher = userRepository.findTeacherByUsername(teacherUsername).orElseThrow();
        if (teacher != null) {
            teacher.setName(name);
            teacher.setEmail(email);
            teacher.setPhoneNumber(phoneNumber);
            userRepository.save(teacher);
        }

    }
}
