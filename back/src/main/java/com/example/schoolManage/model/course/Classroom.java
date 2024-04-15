package com.example.schoolManage.model.course;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
@Document("classes")
public class Classroom{
    @Id
    private String classId;
    private String subject;
    private String place;
    private String day;
    private List<Integer> time;
    private List<String> students;
    private String teacher;

    public Classroom(String classId, String subject, String place, String day, List<Integer> time, String teacher) {
        this.classId = classId;
        this.subject = subject;
        this.place = place;
        this.day = day;
        this.time = time;
        this.teacher = teacher;
        this.students = new ArrayList<>(40);
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public List<Integer> getTime() {
        return time;
    }

    public void setTime(List<Integer> time) {
        this.time = time;
    }

    public List<String> getStudents() {
        return students;
    }

    public void setStudents(List<String> students) {
        this.students = students;
    }

    public String getTeacher() {
        return teacher;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }
}
