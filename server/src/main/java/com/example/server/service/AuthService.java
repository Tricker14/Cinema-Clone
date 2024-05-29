package com.example.server.service;

import com.example.server.dto.AuthResponseDTO;
import com.example.server.dto.LoginDTO;
import com.example.server.dto.RegisterDTO;
import com.example.server.entity.CinemaUser;
import com.example.server.entity.Role;
import com.example.server.exception.UserNotFoundException;
import com.example.server.repository.RoleRepository;
import com.example.server.repository.UserRepository;
import com.example.server.security.JwtGenerator;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthService {
    AuthenticationManager authenticationManager;
    PasswordEncoder passwordEncoder;
    JwtGenerator jwtGenerator;
    UserRepository userRepository;
    RoleRepository roleRepository;

    public AuthService(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder,
                       JwtGenerator jwtGenerator, UserRepository userRepository, RoleRepository roleRepository){
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public CinemaUser register(RegisterDTO registerDTO){
        CinemaUser user = new CinemaUser();
        user.setUsername(registerDTO.getUsername());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));

        Role roles = roleRepository.findByName("USER").get();
        user.setRoles(Collections.singletonList(roles));

        userRepository.save(user);

        return user;
    }

    public AuthResponseDTO authResponseDTO(LoginDTO loginDTO){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getUsername(),
                        loginDTO.getPassword()
                ));
        CinemaUser user = userRepository.findByUsername(loginDTO.getUsername()).orElseThrow(()
                -> new UsernameNotFoundException("Username not found"));
        if(!authentication.isAuthenticated() || !user.isEnabled()){
            throw new UserNotFoundException("Invalid username or password");
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        String username = loginDTO.getUsername();

        return new AuthResponseDTO(token, username);
    }
}
