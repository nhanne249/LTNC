package com.example.schoolManage.model.user;

import com.example.schoolManage.enums.Role;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;
@Getter
@Setter
@Document(collection = "users")
public class Student extends User {
    private String name;
    private String email;
    private String phone;
    private Map<String, Double> scores;
    private Student(String username, String password, String name,String email, String phone) {
        super(username, password, Role.STUDENT);
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.scores = new HashMap<>();
    }
    public static class Builder{
        private String username;
        private String password;
        private String name;
        private String email;
        private String phone;
        public Builder username(String username){this.username = username; return this;}
        public Builder password(String password){this.password = password; return this;}
        public Builder name(String name){this.name = name; return this;}
        public Builder email(String email){this.email = email; return this;}
        public Builder phone(String phone){this.phone = phone; return this;}
        public Student build(){return new Student(username, password, name, email, phone);}
    }
}