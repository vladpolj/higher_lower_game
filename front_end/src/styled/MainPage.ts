import styled from "styled-components";
import backgroundImage from "../assets/background.jpg";
import { Button } from "@mui/material";

export const MainPageBackground = styled.div`
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
`;

export const MainPageLogo = styled.img`
    padding-top: 5vw;
    width: 14vw;
    display: flex;
    margin: 0 auto;
`;

export const MainPageButtonsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 25vw;
    margin-top: 3vw;
    margin-left: auto;
    margin-right: auto;
`;

export const MainPageButtons = styled(Button)`
    && {
        background-color: #59ac51;
        color: #fff;
        font-weight: 700;
        font-size: 1vw;
        text-transform: capitalize;
        border-radius: 2vw;
        padding: 0.5vw 1.5vw 0.5vw 1.5vw;
    }
`;
