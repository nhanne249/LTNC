package com.example.schoolManage.controller;

import com.example.schoolManage.model.ChangePassword;
import com.example.schoolManage.model.DTO.MailBodyDto;
import com.example.schoolManage.model.ForgotPassword;
import com.example.schoolManage.repository.ForgotPasswordRepository;
import com.example.schoolManage.repository.UserRepository;
import com.example.schoolManage.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.Objects;
import java.util.Random;

@RestController
@RequestMapping("/forgotPassword")
@RequiredArgsConstructor
public class ForgotPasswordController {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final ForgotPasswordRepository forgotPasswordRepository;
    private final PasswordEncoder passwordEncoder;


    // send mail for email verification
    @PostMapping("/verifyMail/{username}")
    public ResponseEntity<String> verifyEmail(@PathVariable String username) {
        var st = userRepository.findStudentByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Student not found"));
        int otp = otpGenerator();
        MailBodyDto mailBody = MailBodyDto.builder()
                .to(st.getEmail())
                .text("This is OPT: " + otp)
                .subject("OTP for forgot password request")
                .build();
        ForgotPassword forgotPassword = ForgotPassword.builder()
                .otp(otp)
                .expirationTime(new Date(System.currentTimeMillis() + 70*1000))
                .username(st.getUsername())
                .build();
        emailService.sendSimpleMessage(mailBody);
        forgotPasswordRepository.save(forgotPassword);

        return ResponseEntity.ok("Email sent for verification");
    }

    @PostMapping("/verifyOtp/{username}/{otp}")
    public ResponseEntity<String> verifyOTP(@PathVariable Integer otp, @PathVariable String username) {
        var st = userRepository.findStudentByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Student not found"));
        ForgotPassword fp = forgotPasswordRepository.findByOtpandStudent(otp, username)
                .orElseThrow(()->new RuntimeException("invalid for email"));
        if (fp.getExpirationTime().before(Date.from(Instant.now()))) {
            forgotPasswordRepository.deleteById(fp.getFpid());
            return new ResponseEntity<>("OTP has expired", HttpStatus.EXPECTATION_FAILED);
        }
        return ResponseEntity.ok("OTP verified");
    }

    @PostMapping("/changePassword/{username}")
    public ResponseEntity<String> changePasswordHandler(@RequestBody ChangePassword changePassword,
                                                        @PathVariable String username) {
        if (!Objects.equals(changePassword.passWord(), changePassword.resetPassword())) {
            return new ResponseEntity<>("Please enter new password",HttpStatus.EXPECTATION_FAILED);
        }

        String encodePassword = passwordEncoder.encode(changePassword.passWord());
        var st = userRepository.findStudentByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Student not found"));
        userRepository.updateUserByUsername(st.getEmail(), encodePassword);

        return ResponseEntity.ok("Password has been changed");

    }

    public Integer otpGenerator() {
        Random random = new Random();
        return random.nextInt(100000, 999999);
    }
}
