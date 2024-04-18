package com.example.schoolManage.repository.custom;

import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserRepositoryCustom{
    Page<Student> findAllStudents(Pageable pageable);
    Page<Teacher> findAllTeachers(Pageable pageable);
}
