import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import LearnWords from './pages/LearnWords';
import LearnModels from './pages/LearnModels';

export const Header: React.FC = () => (
    <header>
        <nav>
            <NavButton to="/" label="Home" />
            <NavButton to="/words" label="Learn Words" />
            <NavButton to="/models" label="Learn Models" />
        </nav>
    </header>
);

export const NavButton: React.FC<{ to: string; label: string }> = ({ to, label }) => {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(to)}>{label}</button>
    );
};

export const Main: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.slice(1);
        if (!path) {
            window.history.pushState({}, "", "/");
        }
    }, [location]);

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/words" element={<LearnWords />} />
                <Route path="/models" element={<LearnModels />} />
            </Routes>
        </main>
    );
};
