package com.example.schoolManage.model.course;

import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "courses")
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    private ObjectId id;
    private String name;
    private List<Student> students;
    private List<Teacher> teacher;
}
