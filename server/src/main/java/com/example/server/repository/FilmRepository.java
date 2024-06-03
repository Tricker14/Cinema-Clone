package com.example.server.repository;

import com.example.server.entity.CinemaUser;
import com.example.server.entity.Film;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FilmRepository extends JpaRepository<Film, Integer> {
    Optional<Film> findByName(String name);
}
