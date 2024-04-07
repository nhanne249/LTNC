package com.example.schoolManage.model.course;

import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.LinkedList;
import java.util.List;
@Document("classes")
public class Classroom{
    @Id
    private ObjectId id;
    private Course course;
    //private Date date;
    private String classId;
    private String place;
    private List<Student> studentList;
    private Teacher teacher;
    public Classroom(String place, String classId) {
        this.place = place;
        this.classId = classId;
        this.studentList = new LinkedList<>();
    }
    public void setCourse(Course course){
        this.course = course;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public List<Student> getStudentList() {
        return studentList;
    }

    public void setStudentList(List<Student> studentList) {
        this.studentList = studentList;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }
}
