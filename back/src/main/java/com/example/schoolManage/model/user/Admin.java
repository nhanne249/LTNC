package com.example.schoolManage.model.user;

import com.example.schoolManage.enums.Role;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "users")
public class Admin extends User {
    private Admin(String username, String password) {
        super(username, password, Role.ADMIN);
    }
    public static class Builder{
        private String username;
        private String password;
        public Builder username(String username) {this.username = username; return this;}
        public Builder password(String password) {this.password = password; return this;}
        public Admin build(){return new Admin(username, password);}
    }
}
