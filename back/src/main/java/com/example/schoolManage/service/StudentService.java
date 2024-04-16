package com.example.schoolManage.service;


import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    private final UserRepository userRepository;
    private final ClassRepository classRepository;

    public StudentService(UserRepository userRepository, ClassRepository classRepository) {
        this.userRepository = userRepository;
        this.classRepository = classRepository;
    }
//    public List<Classroom> getAllClassrooms(String username){return classRepository.findAllByStudent(username);}
//    public Classroom enrollClassroom(String username, String classId){
//        Optional<Classroom> classroom = classRepository.findById(classId);
//        if(classroom.isPresent()){
//            classroom.get().getStudents().add(username);
//            return classroom.get();
//        }
//        return null;
//    }

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

    public ResponseEntity<String> enrollClass(String username, String classId) {
        Optional<Classroom> cl = classRepository.findById(classId);
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

    public ResponseEntity<String> unrollClass(String username, String classId) {
        Optional<Classroom> cl = classRepository.findById(classId);
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

    public Optional<Student> getStudent(String username) {
        return userRepository.findStudentByUsername(username);
    }

    public List<Classroom> getAllClassSubject(String subject) {
        return classRepository.findAllBySubject(subject);

    }



}
