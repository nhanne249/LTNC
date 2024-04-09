package com.example.schoolManage.repository;

import com.example.schoolManage.model.user.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    @Query("{ 'username' : ?0 }")
    User findUserByUsername(String username);
}
