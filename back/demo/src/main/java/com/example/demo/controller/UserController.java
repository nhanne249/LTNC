package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.UserService;
import com.example.demo.entity.User;
import com.example.demo.model.dto.UserDto;
import com.example.demo.model.dto.UserRequest;
import com.example.demo.model.dto.UserUpdateRequest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("")
    public ResponseEntity<?> getListUser(@RequestParam(required = false) String param) {
        List<UserDto> users = userService.getListUser();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        UserDto result = userService.findUserByID(id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchUser(
            @RequestParam(name = "keyword", required = false, defaultValue = "") String name) {
        List<UserDto> result = userService.findUserByName(name);
        return ResponseEntity.ok(result);
    }

    @PostMapping("")
    public ResponseEntity<?> createUser(@RequestBody UserRequest userRequest) {
        User result = userService.addUser(userRequest.name(),userRequest.email(),userRequest.phone(),userRequest.role(),userRequest.password());
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserById(@PathVariable String id, @RequestBody UserUpdateRequest userUpdateRequest) {
        return ResponseEntity.ok(userService.updateUserById(id, userUpdateRequest.name(), userUpdateRequest.email(), userUpdateRequest.phone(),userUpdateRequest.state()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        boolean result = userService.deleteUserById(id);
        return ResponseEntity.ok(result);
    }
}
