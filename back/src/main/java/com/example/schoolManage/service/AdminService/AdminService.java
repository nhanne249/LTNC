package com.example.schoolManage.service.AdminService;

import com.example.schoolManage.model.course.Course;
import com.example.schoolManage.model.user.User;

import java.util.List;

public interface AdminService {
    public List<User> getAllUsers();
    public void deleteUser(String username);
    public void deleteAll();
    public User createUser(User user);
    public User updateUser(String username, User user);
    public Course addCourse(Course course);
    public void deleteCourse(String name);
}
