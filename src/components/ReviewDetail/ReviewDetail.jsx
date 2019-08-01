import React, { useRef, useCallback } from 'react';
import { HighLightedLine } from '../HighLightedLine';
import { RecordComment } from '../RecordComment';
import { useHighlighter } from '../../hooks';
import './ReviewDetail.css';
import { Persistence } from '../../services';

export function ReviewDetail({ value, reviewKey, setReview }) {
  const reviewDetailRef = useRef(null);
  const { highlighted, setHighlighted } = useHighlighter(value.highlighted);
  const onSetHighlighted = useCallback(
    newHighlighted => {
      const updateHighlighted = { ...highlighted, ...newHighlighted };
      setHighlighted(updateHighlighted);

      // Set review details when comment is recorded
      if (newHighlighted.hasOwnProperty('comment')) {
        const updatedReview = {
          [reviewKey]: {
            ...value,
            highlighted: updateHighlighted
          }
        };
        const persistedReview = Persistence.get();
        const result = Persistence.set({
          ...persistedReview,
          ...updatedReview
        });
        if (result) {
          setReview(updatedReview);
        }
      }
    },
    [highlighted, setHighlighted, value, reviewKey, setReview]
  );
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
        setHighlighted={onSetHighlighted}
      />
    </div>
  );
}
