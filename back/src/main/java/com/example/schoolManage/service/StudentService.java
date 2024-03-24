package com.example.schoolManage.service;

import com.example.schoolManage.model.Student;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    public List<Student> getAllStudent();
    public Optional<Student> getStudentByUsername(String username);
    public Student updateStudentByUserName(String username);
    public void deleteStudentByUsername(ObjectId id);
}
