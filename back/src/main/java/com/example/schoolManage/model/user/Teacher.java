package com.example.schoolManage.model.user;

import com.example.schoolManage.enums.Role;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Document(collection = "users")
public class Teacher extends User {
    private String name;
    private String email;
    private String phone;
    private List<String> degrees;

    private List<String> review;

    public void addReview(String username) {
        this.review.add(username);
    }

    public void removeReview(String username) { this.review.remove(username);}

    public Teacher(String username, String password, String name, String email, String phone, List<String> degrees) {
        super(username, password, Role.TEACHER);
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.degrees = degrees;
        this.review = new ArrayList<>();
    }

}



