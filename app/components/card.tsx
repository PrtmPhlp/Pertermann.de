
// app/components/Card.tsx
import React from 'react';

type CardProps = {
  title: string;
  content: string;
};

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      maxWidth: '300px',
      margin: '20px auto',
      backgroundColor: '#fff',
    }}>
      <h2 style={{ fontSize: '1.5em', margin: '0 0 10px' }}>{title}</h2>
      <p style={{ margin: '0' }}>{content}</p>
    </div>
  );
};

export default Card;
