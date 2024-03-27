package com.example.schoolManage.service.StudentService;

import com.example.schoolManage.model.course.Course;
import com.example.schoolManage.model.user.Student;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    public List<Student> getAllStudent();
    public Optional<Student> getStudentByUsername(String username);
    public Student updateStudentByUserName(String username, Student student);
    public void deleteStudentByUsername(String username);
    public Course enrollCourse (String studentUsername, Course course);
    public void disenrollCourse(String username, String courseName);

}
