import { Metadata } from 'next';
import ResumeClient from './ResumeClient';

export const metadata: Metadata = {
    description: 'Lebenslauf – passwortgeschützt.',
    robots: { follow: false, index: false },
    title: 'Resume',
};

export default function ResumePage() {
    return <ResumeClient />;
}
