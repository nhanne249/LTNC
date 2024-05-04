package com.example.schoolManage.service;

import com.example.schoolManage.model.review.Review;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.model.user.User;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.ReviewRepository;
import com.example.schoolManage.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.example.schoolManage.utils.Helper.setIfNotNull;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ClassRepository classRepository;
    private final ReviewRepository reviewRepository;


    public Page<User> getAllUsers(int page) {
        final int PAGE_SIZE = 10;
        return userRepository.findAll(PageRequest.of(page - 1, PAGE_SIZE)); // danh so bat dau tu 0
    }
    public Optional<User> getUser(String username) {
        return userRepository.findByUsername(username);
    }
    public void deleteAllUser(){userRepository.deleteAll();}
    public void deleteUser(String username) {
        var user = userRepository.findByUsername(username);
        if(user.isPresent()){
            if(user.get().getClass().equals(Student.class)){
                classRepository.findAllByStudent(username).forEach(classroom->{
                    classroom.getStudents().remove(username);
                    classRepository.save(classroom);
                });
                List<Review> reviews = reviewRepository.findAll();
                reviews.forEach(review->{
                    if(Objects.equals(review.getStudent(), username))
                        reviewRepository.delete(review);
                });
            }
            if(user.get().getClass().equals(Teacher.class)){
                classRepository.findAllByTeacher(username).forEach(classroom->{
                    classroom.setTeacher("Chưa có");
                    classRepository.save(classroom);
                });
                List<Review> reviews = reviewRepository.findAll();
                reviews.forEach(review->{
                    if(Objects.equals(review.getTeacher(), username))
                        reviewRepository.delete(review);
                });
            }
        }




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
        if(update.getPassword() != null){
            st.get().setPassword(passwordEncoder.encode(update.getPassword()));
        }
        return userRepository.save(st.get());
    }
    public Teacher updateTeacher(@NotNull Teacher update, String username) throws IllegalAccessException {
        var tc = userRepository.findTeacherByUsername(username);
        if (tc.isEmpty()) {
            return null;
        }
        setIfNotNull(tc.get(), update);
        if (update.getPassword() != null) {
            tc.get().setPassword(passwordEncoder.encode(update.getPassword()));
        }
        return userRepository.save(tc.get());
    }
}
