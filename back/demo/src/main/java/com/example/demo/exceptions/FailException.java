package com.example.demo.exceptions;

public class FailException extends RuntimeException {
    public FailException(String message) {
        super(message);
    }
}
