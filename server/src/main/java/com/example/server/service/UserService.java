package com.example.server.service;

import com.example.server.dto.AuthResponseDTO;
import com.example.server.dto.LoginDTO;
import com.example.server.dto.RegisterDTO;
import com.example.server.entity.CinemaUser;
import com.example.server.entity.Role;
import com.example.server.exception.UserNotFoundException;
import com.example.server.repository.RoleRepository;
import com.example.server.repository.UserRepository;
import com.example.server.repository.VerificationTokenRepository;
import com.example.server.security.JwtGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {
    UserRepository userRepository;
    VerificationTokenRepository verificationTokenRepository;

    @Autowired
    public UserService(UserRepository userRepository, VerificationTokenRepository verificationTokenRepository){
        this.userRepository = userRepository;
        this.verificationTokenRepository = verificationTokenRepository;
    }

    public void save(CinemaUser user){
        userRepository.save(user);
    }

    public Optional<CinemaUser> findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }
}

