package com.example.schoolManage.model.user;

import com.example.schoolManage.model.course.Classroom;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.LinkedList;
import java.util.List;
@Document(collection = "users")
public class Teacher extends User{
    private String name;
    private String email;
    private String phoneNumber;
    private List<String> degrees;
    private List<Classroom> teachingClasses;

    public Teacher(String username, String password, String name, String email, String phoneNumber) {
        super(username, password, "TEACHER");
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.teachingClasses = new LinkedList<>();
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

    public List<String> getDegrees() {
        return degrees;
    }

    public void setDegrees(List<String> degrees) {
        this.degrees = degrees;
    }

    public List<Classroom> getTeachingClasses() {
        return teachingClasses;
    }

    public void setTeachingClasses(List<Classroom> teachingClasses) {
        this.teachingClasses = teachingClasses;
    }
}
