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

    public Student updateInfo(Student update, String username) {
        Optional<Student> student = userRepository.findStudentByUsername(username);
        if (student.isEmpty()) return null;
        else {
            if (update.getName() != null) student.get().setName(update.getName());
            if (update.getEmail() != null) student.get().setEmail(update.getEmail());
            if (update.getPhone() != null) student.get().setPhone(update.getPhone());
            return userRepository.save(student.get());
        }
    }

    public ResponseEntity<String> enrollClass(String username, String className) {
        Optional<Classroom> cl = classRepository.findByName(className);
        if (cl.isPresent()) {
            Optional<Student> st = userRepository.findStudentByUsername(username);
            if (st.isEmpty()) {
                return ResponseEntity.ok("STUDENT NOT EXIST");
            } else {
                cl.get().addStudent(st.get().getUsername());
                classRepository.save(cl.get());
                return ResponseEntity.ok("student enroll successfully");
            }
        } else return ResponseEntity.ok("CLASS NOT EXIST");

    }

    public ResponseEntity<String> unrollClass(String username, String className) {
        Optional<Classroom> cl = classRepository.findByName(className);
        if (cl.isPresent()) {
            Optional<Student> st = userRepository.findStudentByUsername(username);
            if (st.isEmpty()) {
                return ResponseEntity.ok("STUDENT NOT EXIST");
            } else {
                cl.get().deleteStudent(st.get().getUsername());
                classRepository.save(cl.get());
                return ResponseEntity.ok("student unenroll successfully");
            }
        } else return ResponseEntity.ok("CLASS NOT EXIST");
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

        } else return ResponseEntity.ok("TEACHER IS NOT EXIST");
    }

}
