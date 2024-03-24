package com.example.schoolManage.model;

import com.example.schoolManage.repository.AdminRepository;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
@Getter
@Setter
@TypeAlias("Admin")
public class Admin extends User {
    public Admin(String username, String password) {
        this.username = username;
        this.password = password;
        this.role = "ADMIN";
    }
}
