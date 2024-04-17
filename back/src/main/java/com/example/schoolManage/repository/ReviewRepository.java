package com.example.schoolManage.repository;

import com.example.schoolManage.model.review.Review;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ReviewRepository extends MongoRepository<Review, ObjectId> {

    Optional<Review> findByStudentName (String username);
}
