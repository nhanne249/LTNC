package com.example.demo.service;

import com.example.demo.entity.State;
import com.example.demo.entity.User;
import com.example.demo.exceptions.FailException;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.hash.HashedPassword;
import com.example.demo.model.dto.UserDto;
import com.example.demo.model.mapper.UserMapper;
import com.example.demo.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private HashedPassword hashPassword;

    public User addUserToDataBase(String name, String email, String phone, String role,State state, String password)
            throws NoSuchAlgorithmException, InvalidKeySpecException {
        String id = UUID.randomUUID().toString();
        User user = User.builder()
                .id(id)
                .name(name)
                .email(email)
                .phone(phone)
                .role(role)
                .state(state)
                .password(hashPassword.hashedPassword(password))
                .build();
        return userRepo.save(user);
    }

    public boolean isEmailExist(String email) {
        return userRepo.findAll().equals(email);
    }

    public List<User> findUserByEmailInDataBase(String email) {
        List<User> result = new ArrayList<User>();
        for (User user : userRepo.findAll()){
            if(user.getEmail().equals(email))
            result.add(user);
        };
        return result;
    }
    public List<User> findUserByNameInDataBase(String name) {
        List<User> result = new ArrayList<User>();
        for (User user : userRepo.findAll()){
            if(user.getName().equals(name))
            result.add(user);
        };
        return result;
    }
    @Override
    public List<UserDto> getListUser(){
        List<UserDto> userDto =new ArrayList<>();
        for(User user : userRepo.findAll()){
            userDto.add(UserMapper.toUserDto(user));
        }
        return userDto;
    }
    @Override
    public User login(String email, String password) {
        List<User> o_user = findUserByEmailInDataBase(email);
        if (!o_user.isEmpty()) {
            throw new NotFoundException("User not found!");
        }
        User user = o_user.getFirst();
        if (user.getState() != State.ACTIVE) {
            throw new NotFoundException("User not activated!");
        }
        try {
            if (hashPassword.validatePassword(password, user.getPassword())) {
                return user;
            } else
                throw new NotFoundException("Password is not correct!");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("An error occurred while hashing the password", e);
        } catch (InvalidKeySpecException e) {
            throw new RuntimeException("An error occurred while hashing the password", e);
        }
    }

    @Override
    public boolean logout(String email) {

        throw new UnsupportedOperationException("Unimplemented method 'logout'");
    }

    @Override
    public User addUser(String name, String email, String phone, String role, String password) {

        List<User> o_user = findUserByEmailInDataBase(email);
        
        try{
            if (!o_user.isEmpty()) {
                throw new NotFoundException("User is Exist!");
            }
        else {
            User result= addUserToDataBase(name, email, phone, role,State.ACTIVE, password);
            return result;
        }
        } catch ( NoSuchAlgorithmException e) {
            throw new RuntimeException("An error occurred while hashing the password", e);
        } catch( InvalidKeySpecException e){
            throw new RuntimeException("An error occurred while hashing the password", e);
        }
    }

    @Override
    public boolean activateUser(String activationCode) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'activateUser'");
    }

    @Override
    public boolean updatePassword(String email, String password) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updatePassword'");
    }

    @Override
    public boolean updateUser(String email, String newEmail) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateEmail'");
    }
    
    @Override
    public boolean updateUserById(String id, String name, String email, String phone, State state) {
        try{
            User user = User.builder()
            .id(id)
            .name(name)
            .email(email)
            .phone(phone)
            .state(state)
            .build();
            userRepo.save(user);
            return true;
        }
        catch(Exception e){
            throw new FailException("Error");
        }
    }
    @Override
    public boolean deleteUserById(String id) {
        if(userRepo.findById(id).isPresent()){
            userRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<UserDto> findUserByName(String name) {
        List<UserDto> result = new ArrayList<>();
        for(User user : findUserByNameInDataBase(name)){
            result.add(UserMapper.toUserDto(user));
        }
        return result;
    }

    @Override
    public UserDto findUserByID(String id) {
        User user = userRepo.findById(id).get();
        
        return UserMapper.toUserDto(user);
    }


}
