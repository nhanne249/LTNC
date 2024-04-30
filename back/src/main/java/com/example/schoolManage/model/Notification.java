package com.example.schoolManage.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Data
@Document(collection = "notifications")
public class Notification {

    @Id
    private long id;
    private String title;
    private String content;
    public Notification(long id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
}
