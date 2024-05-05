package com.example.schoolManage.repository;

import com.example.schoolManage.model.files.Avatar;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface AvatarRepository extends MongoRepository<Avatar, ObjectId> {
    Optional<Avatar> findByUsername(String username);
}
