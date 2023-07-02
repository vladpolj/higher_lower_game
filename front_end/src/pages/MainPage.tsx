import React from "react";
import logoImage from "../assets/logo.svg";
import {
    MainPageBackground,
    MainPageButtons,
    MainPageButtonsContainer,
    MainPageLogo,
} from "../styled/MainPage";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { GameDifficulty } from "../types/Types";

export default function MainPage() {
    const handleClickStartTheGame = (difficulty: GameDifficulty) => {
        const url = `/game/${difficulty}`;
        window.location.href = url;
    };

    return (
        <MainPageBackground>
            <MainPageLogo src={logoImage} />
            <MainPageButtonsContainer>
                <MainPageButtons
                    variant="contained"
                    onClick={() => {
                        handleClickStartTheGame("easy");
                    }}
                >
                    Easy <PlayArrowIcon />
                </MainPageButtons>
                <MainPageButtons
                    variant="contained"
                    onClick={() => {
                        handleClickStartTheGame("hard");
                    }}
                >
                    Hard <PlayArrowIcon />
                </MainPageButtons>
            </MainPageButtonsContainer>
        </MainPageBackground>
    );
}
