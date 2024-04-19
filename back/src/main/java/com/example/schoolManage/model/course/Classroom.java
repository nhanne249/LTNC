package com.example.schoolManage.model.course;

import lombok.Data;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
@Data
@Getter
@Document("classes")
public class Classroom{
    @Id
    private ObjectId id;
    private String name;
    private String subject;
    private String day;
    private List<Integer> time;
    private List<String> students;
    private String teacher;

    public Classroom(String name, String subject, String day, List<Integer> time, String teacher) {
        this.name = name;
        this.subject = subject;
        this.day = day;
        this.time = time;
        this.teacher = teacher;
        this.students = new ArrayList<>(40);
    }
    public void addStudent(String student) {
        this.students.add(student);
    }
    public void deleteStudent(String student) {
        this.students.remove(student);
    }
}
