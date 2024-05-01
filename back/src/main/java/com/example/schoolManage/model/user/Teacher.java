package com.example.schoolManage.model.user;

import com.example.schoolManage.enums.Role;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.List;

@Setter
@Getter
@Document(collection = "users")
public class Teacher extends User {
    private String name;
    private String email;
    private String phone;
    private List<String> degrees;



//    public void addReview(String username) {
//        this.review.add(username);
//    }
//
//    public void removeReview(String username) { this.review.remove(username);}

    private Teacher(String username, String password, String name, String email, String phone, List<String> degrees) {
        super(username, password, Role.TEACHER);
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.degrees = degrees;
    }
    public static class Builder{
        private String username;
        private String password;
        private String name;
        private String email;
        private String phone;
        private List<String> degrees;
        public Builder username(String username) {this.username = username;return this;}
        public Builder password(String password) {this.password = password;return this;}
        public Builder name(String name) {this.name = name;return this;}
        public Builder email(String email) {this.email = email;return this;}
        public Builder phone(String phone) {this.phone = phone;return this;}
        public Builder degrees(List<String> degrees) {this.degrees = degrees;return this;}
        public Teacher build(){return new Teacher(username, password, name, email, phone, degrees);}
    }

}



