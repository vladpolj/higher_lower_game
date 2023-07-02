import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Movie } from "../interfaces/Interfaces";
import { GameMode } from "../types/Types";
import GameModeDialog from "../components/GameModeDialog";
import {
    BackButton,
    BackButtonDiv,
    GameContainer,
    GamePageBackBacground,
    GameSettings,
    HigherLowerButtons,
    IconContainer,
    LeftMovieContent,
    RightMovieContent,
    VerticalLine,
} from "../styled/GamePage";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function GamePage() {
    const { gameDifficulty } = useParams();

    const [movies, setMovies] = useState<Movie[]>([]);

    const [gameMode, setGameMode] = useState<GameMode>("vote average");

    const [modeSelected, setModeSelected] = useState(false);

    const [leftMovie, setLeftMovie] = useState<Movie>();

    const [rightMovie, setRightMovie] = useState<Movie>();

    const [score, setScore] = useState(0);

    const [choiceAlert, setChoiceAlert] = useState("...");

    const usedMovieIds: number[] = [];

    const [valueToCompare, setValueToCompare] = useState(0);

    // create request to end-points
    const createRequest = async (mode: GameMode) => {
        let endPointUrl = "";
        switch (mode) {
            case "popularity":
                endPointUrl = "/sorted-by-popularity";
                break;
            case "revenue":
                endPointUrl = "/sorted-by-revenue";
                break;
            case "run time":
                endPointUrl = "/sorted-by-runtime";
                break;
            case "vote average":
                endPointUrl = "/sorted-by-vote-average";
                break;
        }
        try {
            const response = await axios.get<Movie[]>("/movies" + endPointUrl);
            setMovies(response.data);
            let two_movies: Movie[] = getRandomMovies(response.data, 2);
            setLeftMovie(two_movies[0]);
            setRightMovie(two_movies[1]);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    // change current game mode and send new request for sorted movies
    const handleSelectMode = (newMode: GameMode) => {
        setGameMode(newMode);
        createRequest(newMode);
    };

    // close dialog
    const handleCloseDialog = () => {
        setModeSelected(true);
    };

    // get movies to compare
    function getRandomMovies(movies: Movie[], amount: 1 | 2): Movie[] {
        // Filter out the movies that have already been used
        const availableMovies = movies.filter(
            (movie) => !usedMovieIds.includes(movie.id)
        );

        // Check if there are enough available movies to select
        if (availableMovies.length < amount) {
            console.warn("Not enough available movies.");
            return [];
        }

        // Select movie
        const randomMovies: Movie[] = [];
        // easy difficulty = random choice
        if (
            gameDifficulty?.toUpperCase() === "EASY" ||
            (gameDifficulty?.toUpperCase() === "HARD" && amount === 2)
        ) {
            for (let i = 0; i < amount; i++) {
                const randomIndex = Math.floor(
                    Math.random() * availableMovies.length
                );
                const selectedMovie = availableMovies.splice(randomIndex, 1)[0];
                randomMovies.push(selectedMovie);
                usedMovieIds.push(selectedMovie.id);
            }
        } else {
            // hard difficulty = close search range for the next
            if (rightMovie !== undefined) {
                const leftMovieIndex = movies.indexOf(rightMovie);
                const startIndex = Math.max(0, leftMovieIndex - 100); // Calculate the starting index
                const endIndex = Math.min(
                    leftMovieIndex + 100,
                    movies.length - 1
                );
                const slicedMovies = movies.slice(startIndex, endIndex + 1);
                slicedMovies.splice(slicedMovies.indexOf(rightMovie), 1);
                for (let i = 0; i < amount; i++) {
                    const randomIndex = Math.floor(
                        Math.random() * slicedMovies.length
                    );
                    const selectedMovie = slicedMovies.splice(
                        randomIndex,
                        1
                    )[0];
                    randomMovies.push(selectedMovie);
                    usedMovieIds.push(selectedMovie.id);
                }
            }
        }
        return randomMovies;
    }

    const higherLowerButtonOnClick = (choice: "higher" | "lower") => {
        let result = false;
        let current_score = score;
        if (
            choice === "higher" &&
            leftMovie !== undefined &&
            rightMovie !== undefined
        ) {
            switch (gameMode) {
                case "popularity":
                    result =
                        leftMovie?.popularity <= rightMovie?.popularity
                            ? true
                            : false;
                    break;
                case "revenue":
                    result =
                        leftMovie?.revenue <= rightMovie?.revenue
                            ? true
                            : false;
                    break;
                case "run time":
                    result =
                        leftMovie?.runtime <= rightMovie?.runtime
                            ? true
                            : false;
                    break;
                case "vote average":
                    result =
                        leftMovie?.voteAverage <= rightMovie?.voteAverage
                            ? true
                            : false;
                    break;
            }
        } else if (
            choice === "lower" &&
            leftMovie !== undefined &&
            rightMovie !== undefined
        ) {
            switch (gameMode) {
                case "popularity":
                    result =
                        leftMovie?.popularity >= rightMovie?.popularity
                            ? true
                            : false;
                    break;
                case "revenue":
                    result =
                        leftMovie?.revenue >= rightMovie?.revenue
                            ? true
                            : false;
                    break;
                case "run time":
                    result =
                        leftMovie?.runtime >= rightMovie?.runtime
                            ? true
                            : false;
                    break;
                case "vote average":
                    result =
                        leftMovie?.voteAverage >= rightMovie?.voteAverage
                            ? true
                            : false;
                    break;
            }
        }

        // if user answered correctly or wrongly
        if (result) {
            setScore(current_score + 100);
            setChoiceAlert("Right!");
            setLeftMovie(rightMovie);
            let newMovie = getRandomMovies(movies, 1)[0];
            switch (gameMode) {
                case "popularity":
                    while (rightMovie?.popularity === newMovie.popularity) {
                        newMovie = getRandomMovies(movies, 1)[0];
                    }
                    break;
                case "revenue":
                    while (rightMovie?.revenue === newMovie.revenue) {
                        newMovie = getRandomMovies(movies, 1)[0];
                    }
                    break;
                case "run time":
                    while (rightMovie?.runtime === newMovie.runtime) {
                        newMovie = getRandomMovies(movies, 1)[0];
                    }
                    break;
                case "vote average":
                    while (rightMovie?.voteAverage === newMovie.voteAverage) {
                        newMovie = getRandomMovies(movies, 1)[0];
                    }
                    break;
            }
            setRightMovie(newMovie);
        } else {
            setScore(0);
            setChoiceAlert(`Wrong! Your score was ${score}`);
        }
    };

    useEffect(() => {
        if (leftMovie !== undefined) {
            switch (gameMode) {
                case "popularity":
                    setValueToCompare(leftMovie?.popularity);
                    break;
                case "revenue":
                    setValueToCompare(leftMovie?.revenue);
                    break;
                case "run time":
                    setValueToCompare(leftMovie?.runtime);
                    break;
                case "vote average":
                    setValueToCompare(leftMovie?.voteAverage);
                    break;
            }
        }
    }, [leftMovie]);

    // initial value for end-point rquest
    useEffect(() => {
        return () => {
            createRequest("vote average");
        };
    }, []);

    return (
        <GamePageBackBacground>
            <GameSettings>
                <h1>Game mode: {gameMode}</h1>
                <h1>Game difficulty: {gameDifficulty} </h1>
                <h1>Score: {score}</h1>
                <h1>Your choice was {choiceAlert}</h1>
            </GameSettings>
            <GameContainer>
                {leftMovie !== undefined && (
                    <LeftMovieContent>
                        <h1>{leftMovie.originalTitle}</h1>
                        <h1>has</h1>
                        <h1>{`${valueToCompare} ${gameMode}`}</h1>
                    </LeftMovieContent>
                )}
                <VerticalLine>
                    <IconContainer>
                        <h1>VS</h1>
                    </IconContainer>
                </VerticalLine>
                {rightMovie !== undefined && leftMovie !== undefined && (
                    <RightMovieContent>
                        <h1>{rightMovie.originalTitle}</h1>
                        <h1>has</h1>
                        <HigherLowerButtons
                            variant="outlined"
                            onClick={() => {
                                higherLowerButtonOnClick("higher");
                            }}
                        >
                            Higher
                        </HigherLowerButtons>
                        <HigherLowerButtons
                            variant="outlined"
                            onClick={() => {
                                higherLowerButtonOnClick("lower");
                            }}
                        >
                            Lower
                        </HigherLowerButtons>
                        <h1>{`${gameMode} than`}</h1>
                        <h1>{leftMovie.originalTitle}</h1>
                    </RightMovieContent>
                )}
            </GameContainer>
            {!modeSelected && (
                <GameModeDialog
                    onSelectGameMode={handleSelectMode}
                    open={!modeSelected}
                    onClose={handleCloseDialog}
                />
            )}
            <BackButtonDiv>
                <BackButton
                    color="primary"
                    aria-label="back"
                    onClick={() => {
                        window.location.href = "/";
                    }}
                >
                    <ArrowBackIcon />
                </BackButton>
            </BackButtonDiv>
        </GamePageBackBacground>
    );
}
