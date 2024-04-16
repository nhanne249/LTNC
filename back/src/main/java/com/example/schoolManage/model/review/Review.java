package com.example.schoolManage.model.review;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("review")
public class Review {
    private String ReviewBody;
    private String studentName;

    public String getReviewBody() {
        return ReviewBody;
    }

    public void setReviewBody(String reviewBody) {
        ReviewBody = reviewBody;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
}
