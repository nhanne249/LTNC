package com.example.schoolManage.auth;

import com.example.schoolManage.enums.Role;

public class AuthenticationResponse {
    private final String token;
    private final Role role;
    public AuthenticationResponse(String token, Role role) {
        this.token = token;
        this.role = role;
    }

    public String getToken() {
        return token;
    }
    public Role getRole(){return role;}
}
