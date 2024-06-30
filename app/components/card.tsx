// app/components/Card.tsx
import React from 'react';

type CardProps = {
  content: string;
  title: string;
};

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        margin: '20px auto',
        maxWidth: '300px',
        padding: '20px',
      }}
    >
      <h2 style={{ fontSize: '1.5em', margin: '0 0 10px' }}>{title}</h2>
      <p style={{ margin: '0' }}>{content}</p>
    </div>
  );
};

export default Card;
