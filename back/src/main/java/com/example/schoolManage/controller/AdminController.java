package com.example.schoolManage.controller;


import com.example.schoolManage.model.user.User;
import com.example.schoolManage.service.AdminService.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUser(){
        return new ResponseEntity<List<User>>(adminService.getAllUsers(), HttpStatus.OK);
    }

    @DeleteMapping("/{username}")
    public ResponseEntity deleteUser(@PathVariable String username){
        adminService.deleteUser(username);
        return ResponseEntity.ok("deleted");
    }
    @DeleteMapping("/all")
    public ResponseEntity deleteAll(){
        adminService.deleteAll();
        return ResponseEntity.ok("deleted all users");
    }
    public UserDetails getLoggedInUserDetails(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.getPrincipal() instanceof UserDetails){
            return (UserDetails) authentication.getPrincipal();
        }
        return null;
    }
}
