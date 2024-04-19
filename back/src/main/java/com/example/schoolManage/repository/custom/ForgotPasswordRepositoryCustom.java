package com.example.schoolManage.repository.custom;

import com.example.schoolManage.model.ForgotPassword;
import java.util.Optional;

public interface ForgotPasswordRepositoryCustom {
    public Optional<ForgotPassword> findByOtpandStudent(Integer otp, String username);
}
