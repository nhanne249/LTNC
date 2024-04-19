package com.example.schoolManage.repository.custom;

import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.List;

public class UserRepositoryCustomImpl implements UserRepositoryCustom {
    private final MongoTemplate mongoTemplate;

    public UserRepositoryCustomImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }


    @Override
    public Page<Student> findAllStudents(@NotNull Pageable pageable) {
        long count = mongoTemplate.count(Query.query(Criteria.where("role").is("STUDENT")), Student.class, "users");
        List<Student> ls = mongoTemplate.find(Query.query(Criteria.where("role").is("STUDENT")).with(pageable), Student.class, "users");
        return new PageImpl<>(ls, pageable, count);
    }

    @Override
    public Page<Teacher> findAllTeachers(Pageable pageable) {
        long count = mongoTemplate.count(Query.query(Criteria.where("role").is("TEACHER")), Teacher.class, "users");
        List<Teacher> ls = mongoTemplate.find(Query.query(Criteria.where("role").is("TEACHER")).with(pageable), Teacher.class, "users");
        return new PageImpl<>(ls, pageable, count);
    }

    public void updateUserByUsername(String email, String password) {
        Query query = new Query(Criteria.where("role").is("STUDENT").and("email").is(email));
        Update update = new Update().set("password", password);
        mongoTemplate.updateFirst(query,update, Student.class);
    }


}
