import React from "react";
import { GameMode } from "../types/Types";
import { GAME_MODES } from "../consts/Consts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {
    DialogDiv,
    DialogTitleStyled,
    GameModeOption,
    GaveModeButton,
} from "../styled/GameModeDialog";

export interface GameModeDialogProps {
    open: boolean;
    onSelectGameMode: (gameMode: GameMode) => void;
    onClose: () => void;
}

export default function GameModeDialog(props: GameModeDialogProps) {
    const { open, onSelectGameMode, onClose } = props;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (mode: GameMode) => {
        onSelectGameMode(mode);
        onClose();
    };

    return (
        <DialogDiv onClose={handleClose} open={open}>
            <DialogTitleStyled>Choose Game Mode</DialogTitleStyled>
            <List sx={{ pt: 0 }}>
                {GAME_MODES.map((mode) => (
                    <ListItem disableGutters key={`${mode}-list-item`}>
                        <GaveModeButton
                            onClick={() => handleListItemClick(mode)}
                            key={mode}
                        >
                            <GameModeOption primary={mode} />
                        </GaveModeButton>
                    </ListItem>
                ))}
            </List>
        </DialogDiv>
    );
}
