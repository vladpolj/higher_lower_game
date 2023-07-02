import {
    Dialog,
    DialogTitle,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import styled from "styled-components";

export const DialogDiv = styled(Dialog)`
    /* background-color: green; */
    background-color: #59ac51;
    color: #fff;
`;

export const DialogTitleStyled = styled(DialogTitle)`
    && {
        font-size: 1.5vw;
        font-weight: 700;
    }
`;

export const GaveModeButton = styled(ListItemButton)`
    :hover {
        background-color: silver;
    }
`;

export const GameModeOption = styled(ListItemText)`
    && span {
        font-size: 1.2vw;
        text-align: center;
        font-weight: 700;
        text-transform: capitalize;
    }
`;
