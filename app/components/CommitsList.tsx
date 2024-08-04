// app/components/CommitsList.tsx
"use client"; // <-- Ensure this line is at the top

import { useEffect, useState } from 'react';

const CommitsList: React.FC = () => {
    const [commitMessages, setCommitMessages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCommits = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/PrtmPhlp/DSBMobile/commits');
                const data = await response.json();
                
                // Extract commit messages from the data
                const messages = data.map((commit: any) => commit.commit.message);
                setCommitMessages(messages);
            } catch (error) {
                console.error('Error fetching commits:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommits();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h3>Latest commits:</h3>
            <ul>
                {commitMessages.slice(0, 5).map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommitsList;
