// app/writing/CommitSection.tsx
import CommitsList from '@/app/components/CommitsList';

interface CommitSectionProps {
  slug: string;
}

const CommitSection: React.FC<CommitSectionProps> = ({ slug }) => {
  if (slug !== 'dsb' && slug !== 'dsb-publication') {
    return null;
  }
  return <CommitsList />;
};

export default CommitSection;
