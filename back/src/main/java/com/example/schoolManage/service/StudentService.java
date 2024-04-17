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
            if (update.getPhoneNumber() != null) student.get().setPhoneNumber(update.getPhoneNumber());
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

    public ResponseEntity<String> unrollClass(String username, String className) {
        Optional<Classroom> cl = classRepository.findByName(className);
        if (cl.isPresent()) {
            Optional<Student> st = userRepository.findStudentByUsername(username);
            if (st.isEmpty()) {
                return ResponseEntity.ok("STUDENT NOT EXIST");
            } else {
                if (!cl.get().getStudents().contains(username))
                    return ResponseEntity.ok("ALREADY UNENROLL");
                cl.get().deleteStudent(st.get().getUsername());
                classRepository.save(cl.get());
                return ResponseEntity.ok("STUDENT UNENROLL SUCCESSFULLY");
            }
        } else return ResponseEntity.ok("CLASS NOT EXIST");
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

    public ResponseEntity<String> deleteRate(String teacher, String username) {
        Classroom cl = inClassOfTeacher(teacher, username);
        if (cl == null) return ResponseEntity.ok("STUDENT ISN'T TAUGHT BY THIS TEACHER");
        Optional<Review> rv = reviewRepository.findByStudentName(username);

        if (rv.isEmpty()) return ResponseEntity.ok("HAVEN'T REVIEWED YET");
        reviewRepository.delete(rv.get());
        Optional<Teacher> tc = userRepository.findTeacherByUsername(teacher);
        tc.get().removeReview(username);
        userRepository.save(tc.get());
        return ResponseEntity.ok("REMOVED REVIEW");
    }

    // kiem tra thong tin lop dang hoc
    public Optional<Classroom> getInfoClass(String className) {
        return classRepository.findByName(className);
    }
}
