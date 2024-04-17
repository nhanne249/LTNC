package com.example.schoolManage.service;

import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.model.user.User;
import com.example.schoolManage.repository.UserRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AdminService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }
    public Page<User> getAllUsers(int page) {
        final int PAGE_SIZE = 10;
        return userRepository.findAll(PageRequest.of(page - 1, PAGE_SIZE)); // danh so bat dau tu 0
    }
    public Optional<User> getUser(String username) {
        return userRepository.findByUsername(username);
    }
    public void deleteAllUser(){userRepository.deleteAll();}
    public void deleteUser(String username) {
        userRepository.deleteByUsername(username);
    }

    public Student createStudent(@NotNull Student student) {
        if (userRepository.findByUsername(student.getUsername()).isPresent()) {
            return null;
        }
        return userRepository.save(new Student(student.getUsername(), passwordEncoder.encode(student.getPassword()),
                student.getName(),  student.getEmail(), student.getPhone()));
    }
    public Page<Student> getAllStudents(int page) {return userRepository.findAllStudents(PageRequest.of(page-1, 10));}
    public Page<Teacher> getAllTeachers(int page) {return userRepository.findAllTeachers(PageRequest.of(page-1, 10));}
    public Teacher createTeacher(@NotNull Teacher teacher) {
        if (userRepository.findByUsername(teacher.getUsername()).isPresent()) {
            return null;
        }
        return userRepository.save(new Teacher(teacher.getUsername(),
                passwordEncoder.encode(teacher.getPassword()),
                teacher.getName(),
                teacher.getEmail(),
                teacher.getPhone(),
                teacher.getDegrees()));
    }
}
