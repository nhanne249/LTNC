package com.example.schoolManage.model.course;

import lombok.Data;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.Consumer;

@Data
@Getter
@Document("classes")
public class Classroom{
    @Id
    private ObjectId id;
    private String name;
    private String subject;
    private String day;
    private List<Integer> time;
    private List<String> students;
    private String teacher;

    private Classroom(String name, String subject, String day, List<Integer> time, String teacher) {
        this.name = name;
        this.subject = subject;
        this.day = day;
        this.time = time;
        this.teacher = teacher;
        this.students = new ArrayList<>(40);
    }
    public void addStudent(String student) {
        this.students.add(student);
    }
    public void deleteStudent(String student) {
        this.students.remove(student);
    }
    public static class Builder{
        private String name;
        private String subject;
        private String day;
        private List<Integer> time;
        private String teacher;
        public Builder name(String name){this.name = name; return this;}
        public Builder subject(String subject){this.subject = subject;return this;}
        public Builder day(String day){this.day = day;return this;}
        public Builder time(List<Integer> time){this.time = time;return this;}
        public Builder teacher(String teacher){this.teacher = teacher;return this;}
        public Classroom build(){return new Classroom(name,subject,day,time,teacher);}
    }

}
