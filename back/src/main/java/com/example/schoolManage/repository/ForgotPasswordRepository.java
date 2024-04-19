package com.example.schoolManage.repository;

import com.example.schoolManage.model.ForgotPassword;
import com.example.schoolManage.repository.custom.ForgotPasswordRepositoryCustom;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface ForgotPasswordRepository extends MongoRepository<ForgotPassword, Integer>, ForgotPasswordRepositoryCustom {

}
