package com.example.schoolManage.repository;

import com.example.schoolManage.model.Avatar;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AvatarRepository extends MongoRepository<Avatar, ObjectId> {
    Optional<Avatar> findByUsername(String username);
}
