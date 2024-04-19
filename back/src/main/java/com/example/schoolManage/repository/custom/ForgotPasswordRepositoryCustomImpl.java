package com.example.schoolManage.repository.custom;

import com.example.schoolManage.model.ForgotPassword;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;
import java.util.Optional;

public class ForgotPasswordRepositoryCustomImpl implements ForgotPasswordRepositoryCustom {
    private final MongoTemplate mongoTemplate;

    public ForgotPasswordRepositoryCustomImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Optional<ForgotPassword> findByOtpandStudent (Integer Otp, String username) {
        List<ForgotPassword> forgotPasswords = mongoTemplate.findAll(ForgotPassword.class, "ForgotPassword");
        Optional<ForgotPassword> fp = forgotPasswords.stream()
                .filter( x -> Otp.equals(x.getOtp()) && username.equals(x.getUsername()))
                .findFirst();
        return fp;
    }
}
