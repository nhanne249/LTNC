package com.example.schoolManage.service.AdminService;

import com.example.schoolManage.model.course.Course;
import com.example.schoolManage.model.user.User;

import java.util.List;

public interface AdminService {
    public List<User> getAllUsers();
    public User getUser(String username);
    public User createUser(User user);
    public void deleteUser(String username);
    public Course addCourse(Course course);
    public void deleteCourse(String courseId);
}
