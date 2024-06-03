package com.example.server.service;

import com.example.server.dto.PasswordHandleDTO;
import com.example.server.entity.CinemaUser;
import com.example.server.exception.PasswordNotMatchException;
import com.example.server.repository.UserRepository;
import com.example.server.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    UserRepository userRepository;
    VerificationTokenRepository verificationTokenRepository;
    PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, VerificationTokenRepository verificationTokenRepository,
                       PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.verificationTokenRepository = verificationTokenRepository;
        this.passwordEncoder = passwordEncoder;
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

    public CinemaUser changePassword(PasswordHandleDTO passwordHandleDTO){
        CinemaUser user = userRepository.findByUsername(passwordHandleDTO.getUsername()).orElseThrow(()
                -> new UsernameNotFoundException("Username not found"));
        if(passwordEncoder.matches(passwordHandleDTO.getOldPassword(), user.getPassword())) {
            if(passwordHandleDTO.getNewPassword().equals(passwordHandleDTO.getConfirmation())){
                user.setPassword(passwordEncoder.encode(passwordHandleDTO.getNewPassword()));
                userRepository.save(user);

                return user;
            }
            else{
                throw new PasswordNotMatchException("Password and confirmation must match!");
            }
        }
        else{
            throw new PasswordNotMatchException("Wrong password!");
        }
    }
}

