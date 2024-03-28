package com.example.schoolManage.model.user;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Data
@Document(collection = "users")
public class Teacher extends User{
    private String name;
    private String email;
    private String phoneNumber;
    private List<String> degrees;
    private List<ObjectId> teachingClasses;

    public Teacher(String username, String password, String role, String name, String email, String phoneNumber) {
        super(username, password, role);
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

}
