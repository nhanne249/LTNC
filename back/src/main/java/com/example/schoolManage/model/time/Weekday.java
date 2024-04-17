package com.example.schoolManage.model.time;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "schedule")
public class Weekday {
    @Id
    private ObjectId id;
    private String day;
    private List<Integer> time;
}
