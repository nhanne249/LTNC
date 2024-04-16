package com.example.schoolManage.model.user;

import com.example.schoolManage.enums.Role;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

@Document(collection = "users")
public class Student extends User {
    private String name;
    private String email;
    private String phoneNumber;
    private Map<String, Double> scores;
    public Student(long id, String username, String password, String name,String email, String phoneNumber) {
        super(id, username, password, Role.STUDENT);
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.scores = new HashMap<>();
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

}
