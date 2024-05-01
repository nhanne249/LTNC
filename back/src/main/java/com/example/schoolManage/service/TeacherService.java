package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.review.Review;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.ReviewRepository;
import com.example.schoolManage.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.example.schoolManage.utils.Helper.setIfNotNull;

@Service
@RequiredArgsConstructor
public class TeacherService {
    private final UserRepository userRepository;
    private final ClassRepository classRepository;
    private final ReviewRepository reviewRepository;

    public List<Classroom> getAllClasses(String teacherUsername) {
        return classRepository.findAllByTeacher(teacherUsername);
    }

    public Optional<Teacher> getTeacher(String username) {
        return userRepository.findTeacherByUsername(username);
    }

    public Optional<Teacher> updateTeacher(String teacherUsername, Teacher update) throws IllegalAccessException {
        var teacher = userRepository.findTeacherByUsername(teacherUsername);
        if(teacher.isEmpty()) {return Optional.empty();}
        setIfNotNull(teacher.get(), update);
        return Optional.of(userRepository.save(teacher.get()));
    }
    public void giveScore2(Map<String, Double> score, String student) {
        Optional<Student> studentOptional = userRepository.findStudentByUsername(student);
        studentOptional.ifPresent(value -> {
            value.getScores().add(score);
            userRepository.save(studentOptional.get());
        });
    }
    public Page<Review> getReviews(String teacherUsername, Pageable pageable) {
        List<Review> allReviews = reviewRepository.findAll();
        List<Review> ls = new ArrayList<>();
        allReviews.forEach(review -> {
            if(review.getTeacher().equals(teacherUsername)) {
                ls.add(review);
            }
        });
        Collections.reverse(ls);
        return new PageImpl<>(ls, pageable, allReviews.size());
    }
}
