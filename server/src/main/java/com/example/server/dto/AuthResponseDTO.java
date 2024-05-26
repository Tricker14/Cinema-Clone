package com.example.server.dto;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

@Data
public class AuthResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer ";
    private String username;

    public AuthResponseDTO(String accessToken, String username){
        this.accessToken = accessToken;
        this.username = username;
    }
}
