package com.example.schoolManage.model.course;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

<<<<<<< HEAD
=======
import java.util.ArrayList;
import java.util.Date;
>>>>>>> 949b8106967ac8d1ef9caeac0d1e6c32e8e3c058
import java.util.LinkedList;
import java.util.List;

@Document(collection = "courses")
public class Course {
    @Id
    private ObjectId id;
    private String name;
    private String courseId;
<<<<<<< HEAD
    private List<Classroom> classes;
    public Course(String name, String courseId){
        this.name = name;
        this.courseId = courseId;
        this.classes = new LinkedList<>();
=======
    private List<Student> students;
    private List<Teacher> teachers;
    public Course(String name, String courseId){
        this.name = name;
        this.courseId = courseId;
        this.students = new LinkedList<>();
        this.teachers = new LinkedList<>();
>>>>>>> 949b8106967ac8d1ef9caeac0d1e6c32e8e3c058
    }
}
