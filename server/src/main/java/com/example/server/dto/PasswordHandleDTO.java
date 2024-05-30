package com.example.server.dto;

import lombok.Data;

@Data
public class PasswordHandleDTO {
    String username;
    String oldPassword;
    String newPassword;
    String confirmation;
}
