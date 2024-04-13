package com.example.schoolManage.auth;

import com.example.schoolManage.config.JwtsService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.example.schoolManage.model.user.User;
import com.example.schoolManage.repository.UserRepository;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;

    private final JwtsService jwtsService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, JwtsService jwtsService,
            AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.jwtsService = jwtsService;
        this.authenticationManager = authenticationManager;
    }
    public AuthenticationResponse authenticate(User request) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        User user = userRepository.findUserByUsername(request.getUsername()).orElseThrow();
        String token = jwtsService.generateToken(user);
        return new AuthenticationResponse(token);
    }
}
