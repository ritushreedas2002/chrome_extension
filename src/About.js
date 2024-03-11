
import React, { useState, useEffect } from 'react';

const About = () => {
    const [problemData, setProblemData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDailyProblem = async () => {
            try {
                const response = await fetch('https://practiceapi.geeksforgeeks.org/api/vr/problems-of-day/problem/today/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProblemData(data);
                setLoading(false);
            } catch (error) {
                console.error('Fetching error:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchDailyProblem();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Daily Coding Challenge</h1>
            {problemData && (
                <div>
                    <p>Title: {problemData.problem_name}</p>
                    <p>Difficulty: {problemData.difficulty}</p>
                    <p>Link: <a href={problemData.problem_url} target="_blank" rel="noopener noreferrer">Solve Challenge</a></p>
                </div>
            )}
        </div>
    );
};

export default About;










