package com.ridango.game.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "movie")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalTitle;
    private String overview;
    private BigDecimal popularity;
    private Date releaseDate;
    private Long revenue;
    private BigDecimal runtime;
    private String tagline;
    private String title;
    private BigDecimal voteAverage;
    private Integer voteCount;
}
