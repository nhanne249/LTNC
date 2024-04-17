package com.example.schoolManage.service;


import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.review.Review;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.ReviewRepository;
import com.example.schoolManage.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    private final UserRepository userRepository;
    private final ClassRepository classRepository;

    private final ReviewRepository reviewRepository;

    public StudentService(UserRepository userRepository, ClassRepository classRepository, ReviewRepository reviewRepository) {
        this.userRepository = userRepository;
        this.classRepository = classRepository;
        this.reviewRepository = reviewRepository;
    }

    public Optional<Student> getStudent(String username) {
        return userRepository.findStudentByUsername(username);
    }

    public List<Classroom> getAllClassrooms(String username) {
        return classRepository.findAllByStudent(username);
    }

    public Optional<Student> updateStudent(String username, Student update) {
        Optional<Student> student = userRepository.findStudentByUsername(username);
        if (student.isPresent()) {
            if (update.getName() != null) student.get().setName(update.getName());
            if (update.getEmail() != null) student.get().setEmail(update.getEmail());
            if (update.getPhone() != null) student.get().setPhone(update.getPhone());
            userRepository.save(student.get());
        }
        return student;
    }

    public Optional<Classroom> enrollClass(String username, String className) {
        Optional<Classroom> cl = classRepository.findByName(className);
        if (cl.isEmpty()) return Optional.empty();
        cl.get().addStudent(username);
        return Optional.of(classRepository.save(cl.get()));
    }

    public Optional<Classroom> unenrollClass(String username, String className) {
        Optional<Classroom> cl = classRepository.findByName(className);
        if (cl.isEmpty()) return Optional.empty();
        cl.get().deleteStudent(username);
        return Optional.of(classRepository.save(cl.get()));
    }

    public ResponseEntity<String> rate(Review review, String className, String username) {
        Optional<Classroom> cl = classRepository.findByName(className);
        review.setStudentName(username);
        if (cl.isPresent()) {
            Optional<Teacher> tc = userRepository.findTeacherByUsername(cl.get().getTeacher());
            tc.get().addReview(username);
            userRepository.save(tc.get());
            reviewRepository.save(review);
            return ResponseEntity.ok("ADDED REVIEW");

        } else return ResponseEntity.ok("CLASS IS NOT EXIST");
    }

}
