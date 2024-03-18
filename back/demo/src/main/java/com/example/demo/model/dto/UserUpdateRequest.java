package com.example.demo.model.dto;

import com.example.demo.entity.State;

public record UserUpdateRequest(String name, String  email, String phone, State state) {
    
}
