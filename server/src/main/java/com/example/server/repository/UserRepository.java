package com.example.server.repository;

import com.example.server.entity.CinemaUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<CinemaUser, Integer> {
    Optional<CinemaUser> findByUsername(String username);
    Boolean existsByUsername(String username);
}
