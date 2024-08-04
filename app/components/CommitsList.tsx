"use client"; // <-- Ensure this line is at the top

import ExternalLink from '@/ui/ExternalLink';
import { useEffect, useState } from 'react';
import styles from './CommitsList.module.css';

interface GitHubCommit {
    commit: {
        message: string;
    };
}

const CommitsList: React.FC = () => {
    const [commitMessages, setCommitMessages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalCommits, setTotalCommits] = useState<number | null>(null);

    useEffect(() => {
        const fetchCommits = async () => {
            try {
                // Fetch the commits data
                const response = await fetch('https://api.github.com/repos/PrtmPhlp/DSBMobile/commits');
                const data: GitHubCommit[] = await response.json();

                // Extract commit messages
                const messages = data.map((commit) => commit.commit.message);
                setCommitMessages(messages);

                // Fetch the total number of commits
                const responseTotal = await fetch('https://api.github.com/repos/PrtmPhlp/DSBMobile/commits?per_page=1');
                const linkHeader = responseTotal.headers.get('link');

                if (linkHeader) {
                    // Use a regular expression to extract the last page number from the Link header
                    const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
                    if (match) {
                        setTotalCommits(Number(match[1]));
                    }
                }
            } catch (error) {
                console.error('Error fetching commits:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommits();
    }, []);

    if (loading) return <h1>Loading commits...</h1>;

    return (
        <div>
            <h3>Aktuelle Commits:</h3>
            <div className={styles['fade-out-list']}>
                <ol reversed={!!totalCommits} start={totalCommits || 1}>
                    {commitMessages.slice(0, 5).map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ol>
            </div>
            <div style={{ display: "block", textAlign: "center" }}>
                <ExternalLink arrow={true} href="https://github.com/PrtmPhlp/DSBMobile/commits/master/">
                    Alle ansehen
                </ExternalLink>
            </div>
        </div>
    );
};

export default CommitsList;
