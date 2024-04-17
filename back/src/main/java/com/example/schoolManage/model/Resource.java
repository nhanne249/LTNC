package com.example.schoolManage.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "resources")
@Data
public class Resource {
    @Id
    private ObjectId id;
    private String name;
    private String classroom;
    private String type;
    private byte[] data;
    public Resource(String name, String classroom,String type, byte[] data) {
        this.name = name;
        this.classroom = classroom;
        this.type = type;
        this.data = data;
    }
}
