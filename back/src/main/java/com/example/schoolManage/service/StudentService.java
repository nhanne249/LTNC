package com.example.schoolManage.service;


import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.review.Review;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.ReviewRepository;
import com.example.schoolManage.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.example.schoolManage.utils.Helper.setIfNotNull;

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

    public Optional<Student> updateStudent(String username, Student update) throws IllegalAccessException {
        Optional<Student> student = userRepository.findStudentByUsername(username);
        if (student.isPresent()) {
            setIfNotNull(student.get(), update);
            userRepository.save(student.get());
        }
        return student;
    }

    public String enrollClass(String username, String className) {
        Optional<Classroom> cl = classRepository.findByName(className);
        if (cl.isPresent()) {
            Optional<Student> st = userRepository.findStudentByUsername(username);
            if (st.isEmpty()) {
                return "STUDENT NOT EXIST";
            } else {
                List<Classroom> list = classRepository.findAllByStudent(username);
                String subject = cl.get().getSubject();
                for (Classroom i : list) {
                    if (i.getSubject().equals(subject))
                        return "ALREADY HAVE CLASS OF THIS SUBJECT";
                }
                cl.get().addStudent(st.get().getUsername());
                classRepository.save(cl.get());
                return "STUDENT ENROLL SUCCESSFULLY";
            }
        } else return "CLASS NOT EXIST";
    }

    public String unenrollClass(String username, String className) {
        Optional<Classroom> cl = classRepository.findByName(className);
        if (cl.isPresent()) {
            Optional<Student> st = userRepository.findStudentByUsername(username);
            if (st.isEmpty()) {
                return "STUDENT NOT EXIST";
            } else {
                if (!cl.get().getStudents().contains(username))
                    return "NOT IN CLASS";
                cl.get().deleteStudent(st.get().getUsername());
                classRepository.save(cl.get());
                return "STUDENT UNENROLL SUCCESSFULLY";
            }
        } else return "CLASS NOT EXIST";
    }


    public String rate(Review review, String student) {
        String teacher = review.getTeacher();
        var existedReview = reviewRepository.findByStudentAndTeacher(student, teacher);
        if(existedReview.isPresent()){
            existedReview.get().setContent(review.getContent());
            existedReview.get().setRating(review.getRating());
            reviewRepository.save(existedReview.get());
        }
        else {
            review.setStudent(student);
            reviewRepository.save(review);
        }
        return "ADDED REVIEW";
    }
    public void deleteReview(String student, String teacher) {
        reviewRepository.deleteByStudentAndTeacher(student, teacher);
    }
}
