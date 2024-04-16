package com.example.schoolManage.repository.custom;

import com.example.schoolManage.model.course.Classroom;

import java.util.List;

public interface ClassRepositoryCustom {
    public List<Classroom> customFindByStudent(String username);
}
