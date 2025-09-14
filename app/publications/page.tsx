import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    description: 'My IT projects, academic work, and technical publications.',
    title: 'Publications',
};

// Define the type for a publication
type Publication = {
    date: string;
    description: string;
    filename: string;
    links?: {
        icon?: 'github' | 'website' | 'demo' | 'external';
        label: string;
        url: string;
    }[];
    presentationFilename?: string;
    title: string;
    type: string;
};

// List of all available publications
const publications: Publication[] = [
    {
        date: '2025',
        description: 'Konzept und Implementierung einer neuen quelloffenen Produktlösung für den schuleigenen DSBmobile-Vertretungsplan mithilfe von Webscraping',
        filename: 'bll.pdf',
        links: [
            {
                icon: 'github',
                label: 'DSB-Backend',
                url: 'https://github.com/PrtmPhlp/DSB-Backend'
            },
            {
                icon: 'github',
                label: 'DSB-Frontend',
                url: 'https://github.com/PrtmPhlp/DSB-Frontend'
            },
        ],
        presentationFilename: 'kolloquium.pdf',
        title: 'Besondere Lernleistung',
        type: 'BLL'
    },
    // Add more publications here
];

export default async function Publications() {
    return (
        <div className="mx-auto max-w-2xl space-y-16 pb-32">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Publications
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    A collection of my IT projects, academic work, and technical publications.
                </p>
            </div>

            <div className="space-y-8">
                {publications.map((publication, index) => (
                    <PublicationCard key={index} publication={publication} />
                ))}
            </div>

            {publications.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                        No publications available at the moment.
                    </p>
                </div>
            )}
        </div>
    );
}

function PublicationCard({ publication }: { publication: Publication }) {
    const pdfUrl = `/static/publications/${publication.filename}`;
    const presentationUrl = publication.presentationFilename
        ? `/static/publications/${publication.presentationFilename}`
        : null;

    return (
        <div className="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            {publication.title}
                        </h3>
                        <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                {publication.type}
                            </span>
                            <span>•</span>
                            <span>{publication.date}</span>
                        </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300">
                        {publication.description}
                    </p>

                    {publication.links && publication.links.length > 0 && (
                        <div className="flex flex-nowrap gap-2 overflow-x-auto sm:flex-wrap sm:overflow-x-visible">
                            {publication.links.map((link, linkIndex) => (
                                <Link
                                    className="inline-flex shrink-0 items-center rounded-md bg-gray-100 px-2.5 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    href={link.url}
                                    key={linkIndex}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    {link.icon === 'github' && (
                                        <svg
                                            className="mr-1.5 h-3.5 w-3.5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                fillRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                    {link.icon === 'external' && (
                                        <svg
                                            className="mr-1.5 h-3.5 w-3.5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
                        <a
                            className="inline-flex flex-1 items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 sm:flex-initial sm:justify-start"
                            download={publication.filename}
                            href={pdfUrl}
                        >
                            <svg
                                className="mr-2 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Download PDF
                        </a>

                        {presentationUrl && (
                            <a
                                className="inline-flex flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:flex-initial sm:justify-start"
                                download={publication.presentationFilename}
                                href={presentationUrl}
                            >
                                <svg
                                    className="mr-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2 3h20" />
                                    <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                                    <path d="m7 21 5-5 5 5" />
                                </svg>
                                Download Presentation
                            </a>
                        )}
                    </div>
                </div>

                <div className="ml-4 hidden flex-shrink-0 sm:flex">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-950">
                        <svg
                            className="h-6 w-6 text-red-600 dark:text-red-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clipRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                fillRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
