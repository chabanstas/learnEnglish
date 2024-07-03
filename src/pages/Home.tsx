import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to the Learning English App</h1>
            <p>Select a page to start learning.</p>
            <button onClick={() => navigate('/words')}>Learn Words</button>
            <button onClick={() => navigate('/models')}>Learn Models</button>
        </div>
    );
}

export default Home;
