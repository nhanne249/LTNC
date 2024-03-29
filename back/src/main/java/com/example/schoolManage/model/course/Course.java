package com.example.schoolManage.model.course;

import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Data
@Document(collection = "courses")
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    private ObjectId id;
    private String name;
    private String courseId;
    private List<Student> students;
    private List<Teacher> teachers;
    public Course(String name, String courseId){
        this.name = name;
        this.courseId = courseId;
        this.students = new LinkedList<>();
        this.teachers = new LinkedList<>();
    }
}
