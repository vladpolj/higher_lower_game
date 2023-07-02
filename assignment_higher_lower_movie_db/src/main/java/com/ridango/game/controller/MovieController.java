package com.ridango.game.controller;


import com.ridango.game.entity.Movie;
import com.ridango.game.repository.MovieRepository;
import com.ridango.game.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;
    private final MovieRepository movieRepository;

    @Autowired
    public MovieController(MovieService movieService, MovieRepository movieRepository) {
        this.movieService = movieService;
        this.movieRepository = movieRepository;
    }

    @GetMapping("/all")
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @GetMapping("/sorted-by-vote-average")
    public List<Movie> getMoviesSortedByVoteAverage() {
        return movieService.getMoviesSortedByVoteAverage();
    }

    @GetMapping("/sorted-by-popularity")
    public List<Movie> getMoviesSortedByPopularity() {
        return movieService.getMoviesSortedByPopularity();
    }

    @GetMapping("/sorted-by-runtime")
    public List<Movie> getMoviesSortedByRuntime() {
        return movieService.getMoviesSortedByRuntime();
    }

    @GetMapping("/sorted-by-revenue")
    public List<Movie> getMoviesSortedByRevenue() {
        return movieService.getMoviesSortedByRevenue();
    }
}
