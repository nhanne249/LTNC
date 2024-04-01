package com.example.schoolManage.model.user;

import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "users")
public class Admin extends User {
    public Admin(String username, String password) {
        super(username, password, "ADMIN");
    }
}
