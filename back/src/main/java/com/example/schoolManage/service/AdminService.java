package com.example.schoolManage.service;

import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.model.user.User;
import com.example.schoolManage.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class AdminService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AdminService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public Page<User> getUsersPage(int page) {
        final int PAGE_SIZE = 10;
        return userRepository.findAll(PageRequest.of(page - 1, PAGE_SIZE)); // danh so bat dau tu 0
    }

    public Student createStudent(Student student) {
        if (userRepository.findByUsername(student.getUsername()).isPresent()) {
            return null;
        }
        return userRepository.save(new Student(userRepository.count(), student.getUsername(), passwordEncoder.encode(student.getPassword()),
                student.getName(),  student.getEmail(), student.getPhoneNumber()));
    }
    public Student updateStudent(Student update, String username){
        Optional<Student> student = userRepository.findStudentByUsername(username);
        if(student.isEmpty()) return null;
        student.get().setName(update.getName());
        student.get().setEmail(update.getEmail());
        student.get().setPhoneNumber(update.getPhoneNumber());
        return userRepository.save(student.get());
    }
    public Teacher updateTeacher(Teacher update, String username){
        var teacher = userRepository.findTeacherByUsername(username);
        if(teacher.isEmpty()) return null;
        teacher.get().setName(update.getName());
        teacher.get().setEmail(update.getEmail());
        teacher.get().setPhoneNumber(update.getPhoneNumber());
        teacher.get().setDegrees(update.getDegrees());
        return userRepository.save(teacher.get());
    }
    public Teacher createTeacher(Teacher teacher) {
        if (userRepository.findByUsername(teacher.getUsername()).isPresent()) {
            return null;
        }
        return userRepository.save(new Teacher(userRepository.count(), teacher.getUsername(),
                passwordEncoder.encode(teacher.getPassword()),
                teacher.getName(),
                teacher.getEmail(),
                teacher.getPhoneNumber(),
                teacher.getDegrees()));
    }

    public Optional<User> getUser(String username) {
        return userRepository.findByUsername(username);
    }

    public void deleteUser(String username) {
        userRepository.deleteByUsername(username);
    }
}
