package com.example.schoolManage.model.user;

import com.example.schoolManage.enums.Role;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

@Document(collection = "users")
public class Student extends User {
    @Getter @Setter private String name;
    @Getter @Setter private String email;
    @Setter @Getter private String phone;
    private Map<String, Double> scores;
    public Student(String username, String password, String name,String email, String phone) {
        super(username, password, Role.STUDENT);
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.scores = new HashMap<>();
    }
}
