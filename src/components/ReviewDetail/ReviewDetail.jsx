import React, { useRef } from 'react';
import { HighLightedLine } from '../HighLightedLine';
import { RecordComment } from '../RecordComment';
import { useHighlighter } from '../../hooks';
import './ReviewDetail.css';

export function ReviewDetail({ value, reviewKey }) {
  const reviewDetailRef = useRef(null);
  const { highlighted, setHighlighted } = useHighlighter();
  const { value: textValue = '' } = value;
  return (
    <div
      className="review-details-container"
      id={`${reviewKey}-container`}
      ref={reviewDetailRef}
    >
      <p className="review-details-content">
        <HighLightedLine textValue={textValue} highlighted={highlighted} />
      </p>
      <RecordComment
        containerRef={reviewDetailRef}
        setHighlighted={setHighlighted}
      />
    </div>
  );
}
