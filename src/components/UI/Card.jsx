import React from 'react';

export function Card({ children, className = "" }) {
  return (
    <article className={`card ${className}`}>
      {children}
    </article>
  );
}