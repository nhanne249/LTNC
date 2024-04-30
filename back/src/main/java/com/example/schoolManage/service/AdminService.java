package com.example.schoolManage.service;

import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.model.user.User;
import com.example.schoolManage.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

import static com.example.schoolManage.utils.Helper.setIfNotNull;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

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
        return userRepository.save(new Student.Builder().username(student.getUsername()).
                password(passwordEncoder.encode(student.getPassword())).
                name(student.getName()).
                email(student.getEmail()).
                phone(student.getPhone()).build());
    }
    public Page<Student> getAllStudents(int page) {return userRepository.findAllStudents(PageRequest.of(page-1, 10));}
    public Page<Teacher> getAllTeachers(int page) {return userRepository.findAllTeachers(PageRequest.of(page-1, 10));}
    public Teacher createTeacher(@NotNull Teacher teacher) {
        if (userRepository.findByUsername(teacher.getUsername()).isPresent()) {
            return null;
        }
        return userRepository.save(new Teacher.Builder().username(teacher.getUsername())
                .password(passwordEncoder.encode(teacher.getPassword()))
                .name(teacher.getName())
                .email(teacher.getEmail())
                .phone(teacher.getPhone())
                .degrees(teacher.getDegrees()).build());
    }
    public Student updateStudent(@NotNull Student update, String username) throws IllegalAccessException {
        var st = userRepository.findStudentByUsername(username);
        if (st.isEmpty() ){
            return null;
        }
        setIfNotNull(st.get(),update);
        return userRepository.save(st.get());
    }
    public Teacher updateTeacher(@NotNull Teacher update, String username) throws IllegalAccessException {
        var tc = userRepository.findTeacherByUsername(username);
        if (tc.isEmpty() ){
            return null;
        }
        setIfNotNull(tc.get(), update);
        return userRepository.save(tc.get());
    }
}
