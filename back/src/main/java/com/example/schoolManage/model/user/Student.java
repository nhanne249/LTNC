package com.example.schoolManage.model.user;

import com.example.schoolManage.model.course.Course;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Data
@Document(collection = "users")
public class Student extends User {
    private String name;
    private String email;
    private String phoneNumber;
    private List<Course> enrolledCourses;

    public Student(String username, String password, String name, String email, String phoneNumber) {
        super(username, password, "STUDENT");
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.enrolledCourses = new LinkedList<Course>();
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
}
