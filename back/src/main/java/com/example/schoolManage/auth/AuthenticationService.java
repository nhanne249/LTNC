package com.example.schoolManage.auth;

import com.example.schoolManage.config.JwtsService;
import com.example.schoolManage.enums.Role;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.schoolManage.model.user.User;
import com.example.schoolManage.repository.UserRepository;

@Service
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private final JwtsService jwtsService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(PasswordEncoder passwordEncoder, UserRepository userRepository, JwtsService jwtsService,
                                 AuthenticationManager authenticationManager) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.jwtsService = jwtsService;
        this.authenticationManager = authenticationManager;
    }
    public AuthenticationResponse register(AuthenticationRequest request){
        userRepository.save(new User(request.getUsername(), passwordEncoder.encode(request.getPassword()), Role.ADMIN));
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        return new AuthenticationResponse(jwtsService.generateToken(user), user.getRole());
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtsService.generateToken(user);
        return new AuthenticationResponse(token, user.getRole());
    }
}
