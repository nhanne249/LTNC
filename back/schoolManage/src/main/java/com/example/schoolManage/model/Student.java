package com.example.schoolManage.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Data
@Document(collection = "users")
@TypeAlias("Student")
@NoArgsConstructor
@AllArgsConstructor
public class Student extends User{
    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    private List<ObjectId> courses;
    public Student(String username, String password, String name){
        this.username = username;
        this.password = password;
        this.name = name;
        this.role = "STUDENT";
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<ObjectId> getCourses() {
        return courses;
    }

    public void setCourses(List<ObjectId> courses) {
        this.courses = courses;
    }
}
