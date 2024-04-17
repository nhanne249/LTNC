package com.example.schoolManage.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "avatars")
@Data
public class Avatar {
    @Id
    private ObjectId id;
    private String username;
    private byte[] image;
    public Avatar(String username, byte[] image) {
        this.username = username;
        this.image = image;
    }
}
