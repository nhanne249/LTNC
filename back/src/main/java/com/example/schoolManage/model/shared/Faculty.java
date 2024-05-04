package com.example.schoolManage.model.shared;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.List;

@Data
@Document(collection = "faculties")
public class Faculty {
    @Id
    private ObjectId id;
    private String name;
    private List<String> subjects;

    public Faculty(String name, List<String> subjects) {
        this.name = name;
        this.subjects = subjects;
    }
}
