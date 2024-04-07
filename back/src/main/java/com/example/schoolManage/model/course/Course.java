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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public List<Classroom> getClasses() {
        return classes;
    }

    public void setClasses(List<Classroom> classes) {
        this.classes = classes;
    }
}
