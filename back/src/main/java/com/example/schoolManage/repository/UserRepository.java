package com.example.schoolManage.repository;

import com.example.schoolManage.model.user.User;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findUserByUsername(String username);
}
