package com.example.schoolManage.service;


import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.review.Review;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.ReviewRepository;
import com.example.schoolManage.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final UserRepository userRepository;
    private final ClassRepository classRepository;

    private final ReviewRepository reviewRepository;


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

    public ResponseEntity<String> enrollClass(String username, String className) {
        Optional<Classroom> cl = classRepository.findByName(className);
        if (cl.isPresent()) {
            Optional<Student> st = userRepository.findStudentByUsername(username);
            if (st.isEmpty()) {
                return ResponseEntity.ok("STUDENT NOT EXIST");
            } else {
                List<Classroom> list = classRepository.findAllByStudent(username);
                String subject = cl.get().getSubject();
                for (Classroom i : list) {
                    if (i.getSubject().equals(subject))
                        return ResponseEntity.ok("ALREADY HAVE CLASS OF THIS SUBJECT");
                }
                cl.get().addStudent(st.get().getUsername());
                classRepository.save(cl.get());
                return ResponseEntity.ok("STUDENT ENROLL SUCCESSFULLY");
            }
        } else return ResponseEntity.ok("CLASS NOT EXIST");
    }

    public ResponseEntity<String> unenrollClass(String username, String className) {
        Optional<Classroom> cl = classRepository.findByName(className);
        if (cl.isPresent()) {
            Optional<Student> st = userRepository.findStudentByUsername(username);
            if (st.isEmpty()) {
                return ResponseEntity.ok("STUDENT NOT EXIST");
            } else {
                if (!cl.get().getStudents().contains(username))
                    return ResponseEntity.ok("NOT IN CLASS");
                cl.get().deleteStudent(st.get().getUsername());
                classRepository.save(cl.get());
                return ResponseEntity.ok("STUDENT UNENROLL SUCCESSFULLY");
            }
        } else return ResponseEntity.ok("CLASS NOT EXIST");
    }


    public ResponseEntity<String> rate(Review review, String teacher, String username) {
        review.setStudentName(username);
        Classroom cl = inClassOfTeacher(teacher, username);
        if (cl==null) return ResponseEntity.ok("STUDENT ISN'T TAUGHT BY THIS TEACHER");
        Optional<Review> rv = reviewRepository.findByStudentName(username);
        if (rv.isPresent()) {
            rv.get().setReviewBody(review.getReviewBody());
            reviewRepository.save(rv.get());
        } else {
            Optional<Teacher> tc = userRepository.findTeacherByUsername(teacher);
            tc.get().addReview(username);
            userRepository.save(tc.get());
            reviewRepository.save(review);
        }
        return ResponseEntity.ok("ADDED REVIEW");

    }

    // kiem tra thong tin lop dang hoc
    public Optional<Classroom> getInfoClass(String className) {
        return classRepository.findByName(className);
    }

    // kiem tra xem co duoc giao vien do day ko
    public Classroom inClassOfTeacher (String teacher, String student) {
        List<Classroom> list = classRepository.findAllByTeacher(teacher);
        if (list==null) return null;
        for (Classroom i : list) {
            if (i.getStudents().contains(student)) return i;
        }
        return null;
    }

    // xoa review
    public ResponseEntity<String> deleteRate(String teacher, String username) {
        Optional<Teacher> tc = userRepository.findTeacherByUsername(teacher);
        if (tc.isEmpty()) ResponseEntity.ok("TEACHER ISN'T EXIST");
        Classroom cl = inClassOfTeacher(teacher, username);
        if (cl == null) return ResponseEntity.ok("STUDENT ISN'T TAUGHT BY THIS TEACHER");
        Optional<Review> rv = reviewRepository.findByStudentName(username);
        if (rv.isEmpty()) return ResponseEntity.ok("HAVEN'T REVIEWED YET");

        reviewRepository.delete(rv.get());
        tc.get().removeReview(username);
        userRepository.save(tc.get());
        return ResponseEntity.ok("REMOVED REVIEW");
    }

}
