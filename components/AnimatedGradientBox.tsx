"use client"
// app/components/AnimatedGradientBox.tsx
import React, { useEffect, useRef } from 'react';

const AnimatedGradientBox: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    let angle = 0;
    const colors = ['#ff7f50', '#ff1493', '#1e90ff', '#32cd32'];
    const updateGradient = () => {
      angle += 1;
      const gradient = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
      box.style.background = gradient;
      requestAnimationFrame(updateGradient);
    };
    updateGradient();
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        width: '100px',
        height: '100px',
        borderRadius: '10px',
      }}
    />
  );
};

export default AnimatedGradientBox;
