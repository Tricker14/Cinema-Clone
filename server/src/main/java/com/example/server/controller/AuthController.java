package com.example.server.controller;

import com.example.server.dto.AuthResponseDTO;
import com.example.server.dto.LoginDTO;
import com.example.server.dto.PasswordHandleDTO;
import com.example.server.dto.RegisterDTO;
import com.example.server.entity.CinemaUser;
import com.example.server.exception.UserNotFoundException;
import com.example.server.service.AuthService;
import com.example.server.service.EmailService;
import com.example.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private UserService userService;
    private EmailService emailService;
    private AuthService authService;

    @Autowired
    public AuthController(UserService userService, EmailService emailService, AuthService authService) {
        this.userService = userService;
        this.emailService = emailService;
        this.authService = authService;
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO){
        try {
            AuthResponseDTO authResponseDTO = authService.login(loginDTO);
            return new ResponseEntity<>(authResponseDTO, HttpStatus.OK);
        }
        catch(AuthenticationException ex) {
            throw new UserNotFoundException("Invalid username or password!");
        }
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO){
        if(!registerDTO.getPassword().equals(registerDTO.getConfirmation())){
            return new ResponseEntity<>("Password and confirmation must match!", HttpStatus.BAD_REQUEST);
        }
        if(userService.existsByUsername(registerDTO.getUsername())){
            return new ResponseEntity<>("Username is already taken", HttpStatus.BAD_REQUEST);
        }
        if(userService.existsByEmail(registerDTO.getEmail())){
            return new ResponseEntity<>("Email is already taken", HttpStatus.BAD_REQUEST);
        }
        CinemaUser user =  authService.register(registerDTO);

        // Create verification token
        String token = UUID.randomUUID().toString();
        emailService.createVerificationToken(user, token);

        // Send verification email
        String appUrl = "http://localhost:8080";
        emailService.sendVerificationEmail(user, token, appUrl);

        return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);
    }

    @GetMapping("email-confirmation")
    public ResponseEntity<String> confirmEmail(@RequestParam("token") String token){
        boolean isConfirmEmail = emailService.confirmEmail(token);
        if(isConfirmEmail){
            return new ResponseEntity<>("Email verified successfully!", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Could not verify email!", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("change-password")
    public ResponseEntity<String> changePassword(@RequestBody PasswordHandleDTO passwordHandleDTO){
        CinemaUser user = userService.changePassword(passwordHandleDTO);
        emailService.sendChangedPasswordNotification(user);
        return new ResponseEntity<String>("You have changed your password!", HttpStatus.OK);
    }

    @PostMapping("forgot-password")
    public ResponseEntity<String> forgotPassword(){
        return null;
    }
}
