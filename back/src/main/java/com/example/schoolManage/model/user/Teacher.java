package com.example.schoolManage.model.user;

import com.example.schoolManage.enums.Role;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "users")
public class Teacher extends User {
    private String name;
    private String email;
    private String phoneNumber;
    private List<String> degrees;


    public Teacher(long id, String username, String password, String name, String email, String phoneNumber, List<String> degrees) {
        super(id, username, password, Role.TEACHER);

        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.degrees = degrees;
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
