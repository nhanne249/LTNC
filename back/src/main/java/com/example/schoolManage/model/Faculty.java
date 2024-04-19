package com.example.schoolManage.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
@Data
@Document(collection = "faculties")
public class Faculty {
    @Id
    private ObjectId id;
    private String name;
    private List<String> subjects;
    public Faculty (String name){
        this.name = name;
        this.subjects = new ArrayList<>();
    }
}
