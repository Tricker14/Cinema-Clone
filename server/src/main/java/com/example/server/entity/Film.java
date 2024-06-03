package com.example.server.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "films")
@Data
@NoArgsConstructor
public class Film {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "genre")
    private String genre;

    @Column(name = "duration")
    private int duration;

    @Column(name = "year")
    private Date publishedYear;

    @Column(name = "rating")
    private double rating;

    @Column(name = "certification")
    private String certification;

    @Column(name = "summary")
    private String summary;

    @Column(name = "poster")
    private String poster;

}
