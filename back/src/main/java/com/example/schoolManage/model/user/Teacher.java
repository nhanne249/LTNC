package com.example.schoolManage.model.user;

import com.example.schoolManage.enums.Role;
import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.course.Course;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.LinkedList;
import java.util.List;
@Document(collection = "users")
public class Teacher extends User{
    private String name;
    private String email;
    private String phoneNumber;
    private List<String> degrees;
    private List<Classroom> teachingClasses;

    public Teacher(String username, String password, String name, String email, String phoneNumber) {
        super(username, password, Role.TEACHER
        );
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.teachingClasses = new LinkedList<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<String> getDegrees() {
        return degrees;
    }

    public void setDegrees(List<String> degrees) {
        this.degrees = degrees;
    }

    public List<Classroom> getTeachingClasses() {
        return teachingClasses;
    }

    public void setTeachingClasses(List<Classroom> teachingClasses) {
        this.teachingClasses = teachingClasses;
    }
    public String getTeacherInfo(){
        return "Name: " + this.name + "\n"  + "Email: "+ this.email + "\n" + "Phone number: " + this.phoneNumber + "\n";
    }
    public void updateTeacherInfo(String name, String email, String phoneNumber ){
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
    public List<Classroom> getAllClass(){
        return teachingClasses;
    }
    public Classroom getClass(String classId){
        for (Classroom classroom : teachingClasses) {
            if (classroom.getClassId().equals(classId)) {
                return classroom;
            }
        }
        return null;
    }
    public void changeClass(Classroom oldClass, Classroom newClass){
        teachingClasses.remove(oldClass);
        teachingClasses.add(newClass);
    }
    public void giveScore(Course course,String classId, String studentId, double scores){
       Classroom classroom = getClass(classId);
       if(classroom != null){
            classroom.setScore(course,studentId,scores);
       }
    }
}
