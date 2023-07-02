package com.ridango.game.service;

import com.ridango.game.entity.Movie;
import com.ridango.game.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getMoviesSortedByVoteAverage() {
        return movieRepository.findAllByOrderByVoteAverageDesc();
    }

    public List<Movie> getMoviesSortedByPopularity() {
        return movieRepository.findAllByOrderByPopularityDesc();
    }

    public List<Movie> getMoviesSortedByRuntime() {
        return movieRepository.findAllByOrderByRuntimeDesc();
    }

    public List<Movie> getMoviesSortedByRevenue() {
        return movieRepository.findAllByOrderByRevenueDesc();
    }
}