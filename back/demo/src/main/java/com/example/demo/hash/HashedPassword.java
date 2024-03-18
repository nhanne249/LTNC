package com.example.demo.hash;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

public interface HashedPassword {
    public String hashedPassword(String password) throws NoSuchAlgorithmException, InvalidKeySpecException;
    public boolean validatePassword(String originalPassword, String storedPassword)throws NoSuchAlgorithmException, InvalidKeySpecException;
}
