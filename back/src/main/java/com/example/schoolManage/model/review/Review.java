package com.example.schoolManage.model.review;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("reviews")
public class Review {
    @Id
    private ObjectId id;
    @Getter @Setter private String content;
    @Getter @Setter  private String student;
    @Getter @Setter  private String teacher;
    @Getter @Setter private Integer rating;

    public Review(String content, String student, String teacher, Integer rating) {
        this.content = content;
        this.student = student;
        this.teacher = teacher;
        this.rating = rating;
    }

}
