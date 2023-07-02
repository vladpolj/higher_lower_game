import { Button, IconButton } from "@mui/material";
import styled from "styled-components";

export const GamePageBackBacground = styled.div`
    background-color: #59ac51;
    background-size: cover;
    background-position: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;
export const GameContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
`;

export const VerticalLine = styled.div`
    position: relative;
    width: 2px;
    height: 100%;
    background-color: #333;
`;

export const IconContainer = styled.div`
    position: absolute;
    background-color: white;
    border-radius: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3vw;
    height: 3vw;
    font-size: 0.8vw;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 0.15vw #333 solid;
`;

export const LeftMovieContent = styled.div`
    flex: 1;
    background-color: #26532b;
    color: #fff;
    padding: 1vw;
    text-align: center;
    padding-top: 5vw;
    font-size: 1vw;
`;

export const RightMovieContent = styled.div`
    flex: 1;
    background-color: #399e5a;
    color: #fff;
    padding: 1vw;
    text-align: center;
    padding-top: 5vw;
    font-size: 1vw;
`;

export const HigherLowerButtons = styled(Button)`
    && {
        color: white;
        border: 1px white solid;
        font-size: 1.5vw;
        margin: 0.5vw;
    }
`;

export const GameSettings = styled.div`
    font-size: 1vw;
    color: white;
    background-color: rgb(199, 85, 85);
    text-align: center;
    h1 {
        margin: 0px;
        text-transform: capitalize;
    }
    padding: 1vw;
`;

export const BackButtonDiv = styled.div`
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 9999;
`;

export const BackButton = styled(IconButton)`
    && {
        color: white;
        .MuiSvgIcon-root {
            font-size: 3vw;
        }
    }
`;
