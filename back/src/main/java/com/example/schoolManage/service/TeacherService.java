package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeacherService {
    private final UserRepository userRepository;
    private final ClassRepository classRepository;

    public List<Classroom> getAllClasses(String teacherUsername) {
        return classRepository.findAllByTeacher(teacherUsername);
    }

    public Optional<Teacher> getTeacher(String username) {
        return userRepository.findTeacherByUsername(username);
    }

    public Optional<Teacher> updateTeacher(String teacherUsername, Teacher update) {
        var teacher = userRepository.findTeacherByUsername(teacherUsername);
        if(teacher.isEmpty()) {return Optional.empty();}
        if(update.getName() != null ) teacher.get().setName(update.getName());
        if(update.getEmail()!= null) teacher.get().setEmail(update.getEmail());
        if(update.getPhone()!= null) teacher.get().setPhone(update.getPhone());
        return Optional.of(userRepository.save(teacher.get()));
    }
    public void giveScore(String className, List<Double> scores) {
        Optional<Classroom> classOptional = classRepository.findByName(className);
        Classroom classroom = classOptional.get();
        List<String> students = classroom.getStudents();
        for (int i = 0; i < students.size(); i++) {
            String studentUsername = students.get(i);
            Double score = scores.get(i);
            Optional<Student> studentOptional = userRepository.findStudentByUsername(studentUsername);
            if (studentOptional.isPresent()) {
                Student student = studentOptional.get();
                student.getScores().put(classroom.getName(), score);
                userRepository.save(student);
            }
        }
    }
}
