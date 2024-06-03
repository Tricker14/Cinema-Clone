package com.example.server.service;

import com.example.server.entity.CinemaUser;
import com.example.server.entity.Film;
import com.example.server.repository.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FilmService {
    FilmRepository filmRepository;

    @Autowired
    public FilmService(FilmRepository filmRepository){
        this.filmRepository = filmRepository;
    }

    public void save(Film film){
        filmRepository.save(film);
    }

    public Optional<Film> findByName(String name) {
        return filmRepository.findByName(name);
    }
}
