package com.example.schoolManage.model.course;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.LinkedList;
import java.util.List;

@Document(collection = "courses")
public class Course {
    @Id
    private ObjectId id;
    private String name;
    private String courseId;
    private List<Classroom> classes;
    public Course(String name, String courseId){
        this.name = name;
        this.courseId = courseId;
        this.classes = new LinkedList<>();
    }
}
