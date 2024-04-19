package com.example.schoolManage.model;

import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document("ForgotPassword")
@Data
@AllArgsConstructor
@Builder
public class ForgotPassword {
    @Id
    private Integer fpid;

    @Getter
    private Integer otp;

    @Getter
    private Date expirationTime;

    @Getter
    private String username;

}
