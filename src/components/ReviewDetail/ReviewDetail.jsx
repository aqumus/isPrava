import React from 'react';
import './ReviewDetail.css';

export function ReviewDetail({ children = '' }) {
  return (
    <div className="review-details-container">
      {children.split('\n').map((lineValue, i) => (
        <span key={i}>{lineValue}</span>
      ))}
    </div>
  );
}
