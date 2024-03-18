package com.example.demo.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import com.example.demo.entity.User;

@Repository
public interface UserRepo extends CrudRepository<User, String>{
    
}
