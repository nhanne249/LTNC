package com.example.schoolManage.model.review;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("review")
public class Review {
    @Id
    private ObjectId id;
    @Getter @Setter private String reviewBody;
    @Getter @Setter  private String studentName; // dung de chua username
    @Getter @Setter private Integer score;

    public Review(String reviewBody, String studentName, Integer score) {
        this.reviewBody = reviewBody;
        this.studentName = studentName;
        this.score = score;
    }

}
