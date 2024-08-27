'use client';

import ExternalLink from '@/ui/ExternalLink';
import { useEffect, useState } from 'react';

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
                const response = await fetch(
                    'https://api.github.com/repos/PrtmPhlp/DSBMobile/commits',
                );
                const data: GitHubCommit[] = await response.json();

                // Extract commit messages and limit them to 100 characters
                const messages = data.map((commit) => {
                    const message = commit.commit.message;
                    return message.length > 100 ? `${message.slice(0, 100)} [...]` : message;
                });
                setCommitMessages(messages);

                // Fetch the total number of commits
                const responseTotal = await fetch(
                    'https://api.github.com/repos/PrtmPhlp/DSBMobile/commits?per_page=1',
                );
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

    if (loading) return <h1 className="text-primary">Loading commits...</h1>;

    return (
        <div>
            <h3 className="text-primary text-xl font-semibold">Aktuelle Commits:</h3>
            <div className="relative overflow-hidden p-4">
                <ol reversed={!!totalCommits} start={totalCommits || 1}>
                    {commitMessages.slice(0, 5).map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ol>
                {/* Gradient overlay with Tailwind CSS for light and dark mode */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-white dark:to-gray-900"
                    style={{ height: '200px' }} // Ensure gradient height is 250px
                />
            </div>
            <div className="mt-4 block text-center">
                <ExternalLink
                    arrow={true}
                    href="https://github.com/PrtmPhlp/DSBMobile/commits/master/"
                >
                    Alle ansehen
                </ExternalLink>
            </div>
        </div>
    );
};

export default CommitsList;
