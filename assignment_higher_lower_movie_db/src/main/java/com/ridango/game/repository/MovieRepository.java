package com.ridango.game.repository;

import com.ridango.game.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findAllByOrderByVoteAverageDesc();

    List<Movie> findAllByOrderByPopularityDesc();

    List<Movie> findAllByOrderByRuntimeDesc();

    List<Movie> findAllByOrderByRevenueDesc();
}
