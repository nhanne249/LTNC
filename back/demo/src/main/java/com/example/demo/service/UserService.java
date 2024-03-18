package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entity.State;
import com.example.demo.entity.User;
import com.example.demo.model.dto.UserDto;

@Service
public interface UserService {
    public List<UserDto> getListUser();

    public User login(String email, String password);

    public boolean logout(String email);

    public User addUser(String name, String email, String phone, String role, String password);

    public boolean activateUser(String activationCode);

    public boolean updatePassword(String email, String password);

    public boolean updateUser(String email, String newEmail);
    public boolean updateUserById(String id,String name, String email, String phone, State state);
    public boolean deleteUserById(String id);
    public List<UserDto> findUserByName(String name);

    public UserDto findUserByID(String id);
}
