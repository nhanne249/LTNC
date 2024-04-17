package com.example.schoolManage.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Resource {
    @Id
    private ObjectId id;
    private String name;
    private String classroom;
    private byte[] data;
    public Resource(String name, String classroom, byte[] data) {
        this.name = name;
        this.classroom = classroom;
        this.data = data;
    }
}
