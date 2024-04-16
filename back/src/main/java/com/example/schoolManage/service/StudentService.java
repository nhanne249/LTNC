package com.example.schoolManage.service;


import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService{
    private final UserRepository userRepository;
    private final ClassRepository classRepository;

    public StudentService(UserRepository userRepository, ClassRepository classRepository) {
        this.userRepository = userRepository;
        this.classRepository = classRepository;
    }
    public List<Classroom> getAllClassrooms(String username){return classRepository.findAllByStudent(username);}
    public Classroom enrollClassroom(String username, String classId){
        Optional<Classroom> classroom = classRepository.findById(classId);
        if(classroom.isPresent()){
            classroom.get().getStudents().add(username);
            return classroom.get();
        }
        return null;
    }

    public Student updateInfo(Student update, String username) {
        Optional<Student> student = userRepository.findStudentByUsername(username);
        if(student.isEmpty()) return null;
        student.get().setName(update.getName());
        student.get().setEmail(update.getEmail());
        student.get().setPhoneNumber(update.getPhoneNumber());
        return userRepository.save(student.get());
    }

//    public void enrollClass(String username, String classId) {
//        Optional<Classroom> cl = classRepository.findById(classId);
//        System.out.println(cl.get().getClassId());
//        cl.get().addStudent(userRepository.findStudentByUsername(username).get().getUsername());
//    }

//    public void unrollClass(String username, String classId) {
//        Optional<Classroom> cl = classRepository.findById(classId);
//        cl.get().deleteStudent(userRepository.findStudentByUsername(username).get().getUsername());
//    }

    public Optional<Student> getStudent(String username) {
        return userRepository.findStudentByUsername(username);
    }

}
