import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import GamePage from "./pages/GamePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/game/:gameDifficulty" element={<GamePage />} />
            </Routes>
        </Router>
    );
}

export default App;
