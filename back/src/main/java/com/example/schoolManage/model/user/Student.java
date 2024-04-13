package com.example.schoolManage.model.user;

import com.example.schoolManage.enums.Role;
import com.example.schoolManage.model.course.Course;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

@Document(collection = "users")
public class Student extends User {
    private String name;
    private String studentId;
    private String email;
    private String phoneNumber;
    private List<Course> enrolledCourses;
    private Map<Course, Double> scores;
    public Student(String username, String password, String name, String studentId, String email, String phoneNumber) {
        super(username, password, Role.STUDENT);
        this.name = name;
        this.studentId = studentId;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.enrolledCourses = new LinkedList<>();
        this.scores = new HashMap<>();
    }
    public Student(){
        super(null, null, Role.STUDENT);
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<Course> getEnrolledCourses() {
        return enrolledCourses;
    }

    public void appendCourse(Course course) {
        this.enrolledCourses.add(course);
    }
    public void removeCourse(Course course) {
        this.enrolledCourses.remove(course);
    }
    public void setScore(Course course, Double score){
        scores.put(course, score);
    }
    public Double getScore(Course course){
        return scores.get(course);
    }
}
