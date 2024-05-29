package com.example.server.service;

import com.example.server.entity.CinemaUser;
import com.example.server.entity.VerificationToken;
import com.example.server.repository.UserRepository;
import com.example.server.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    VerificationTokenRepository verificationTokenRepository;
    JavaMailSender javaMailSender;
    UserRepository userRepository;

    @Autowired
    public EmailService(VerificationTokenRepository verificationTokenRepository, JavaMailSender javaMailSender, UserRepository userRepository){
        this.verificationTokenRepository = verificationTokenRepository;
        this.javaMailSender = javaMailSender;
        this.userRepository = userRepository;
    }

    public void save(VerificationToken verificationToken){
        verificationTokenRepository.save(verificationToken);
    }

    public void createVerificationToken(CinemaUser user, String token){
        VerificationToken verificationToken = new VerificationToken(user, token);
        verificationTokenRepository.save(verificationToken);
    }

    public void sendVerificationEmail(CinemaUser user, String token, String appUrl){
        String emailAddress = user.getEmail();
        String subject = "Registration Confirmation";
        String confirmationUrl = appUrl + "/api/auth/email-confirmation?token=" + token;
        String message = "To confirm your email, please click here: ";

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(emailAddress);
        mail.setSubject(subject);
        mail.setText(message + confirmationUrl);
        javaMailSender.send(mail);
    }

    public ResponseEntity<String> confirmEmail(String token){
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token);
        if(verificationToken != null){
            CinemaUser user = verificationToken.getUser();
            user.setEnabled(true);
            userRepository.save(user);

            return new ResponseEntity<>("Email verified successfully!", HttpStatus.OK);
        }
        return new ResponseEntity<>("Could not verify email!", HttpStatus.BAD_REQUEST);
    }
}
