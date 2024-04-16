package com.example.schoolManage.model.user;

import com.example.schoolManage.enums.Role;
import com.example.schoolManage.model.review.Review;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
public class Teacher extends User {
    private String name;
    private String email;
    private String phoneNumber;
    private List<String> degrees;

    private List<String> review;

    public List<String> getReview() {
        return review;
    }

    public void setReview(List<String> review) {
        this.review = review;
    }

    public void addReview(String username) {
        this.review.add(username);
    }

    public Teacher(String username, String password, Role role, String name, String email, String phoneNumber, List<String> degrees, List<String> review) {
        super(username, password, role);
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.degrees = new ArrayList<>();
        this.review = new ArrayList<>();
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
}
