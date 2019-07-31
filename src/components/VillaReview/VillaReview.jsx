import React, { useCallback } from 'react';
import { useReview, initialReviewValue } from '../../hooks';
import { Persistence } from '../../services';
import { FormRow } from '../FormRow';
import './VillaReview.css';

export function VillaReview() {
  const { review, setReview } = useReview();
  const onSubmit = useCallback(() => {
    const result = Persistence.set(review);
    if (result) {
      setReview({ isSubmitted: true });
    }
  }, [review, setReview]);
  const onDelete = useCallback(() => {
    Persistence.delete();
    setReview(initialReviewValue);
  }, [setReview]);
  const {
    villaName,
    dateOfVisit,
    pincode,
    ownerName,
    surroundingAreaDetails,
    constructionDetails,
    decorDetails,
    isSubmitted
  } = review;
  return (
    <div className="review-container">
      <h2 className="review-header">Villa Review</h2>
      <form className="review-form">
        <FormRow
          reviewKey="villaName"
          label="Name of the villa"
          value={villaName}
          placeholder="Enter Name of the villa"
          onChange={setReview}
          isSubmitted={isSubmitted}
        />
        <FormRow
          reviewKey="dateOfVisit"
          label="Date of visit"
          value={dateOfVisit}
          placeholder="Date of visit"
          inputType="date"
          onChange={setReview}
          isSubmitted={isSubmitted}
        />
        <FormRow
          reviewKey="pincode"
          label="Pincode"
          value={pincode}
          placeholder="Enter Pincode"
          inputType="number"
          onChange={setReview}
          isSubmitted={isSubmitted}
        />
        <FormRow
          reviewKey="ownerName"
          label="Owner Name"
          value={ownerName}
          placeholder="Enter Owner Name"
          inputType="text"
          onChange={setReview}
          isSubmitted={isSubmitted}
        />
        <FormRow
          reviewKey="surroundingAreaDetails"
          label="Surrounding Area Details"
          value={surroundingAreaDetails}
          placeholder="Enter details about surrounding"
          inputType="textarea"
          onChange={setReview}
          isSubmitted={isSubmitted}
        />
        <FormRow
          reviewKey="constructionDetails"
          label="Construction Details"
          value={constructionDetails}
          placeholder="Enter details about house construction"
          inputType="textarea"
          onChange={setReview}
          isSubmitted={isSubmitted}
        />
        <FormRow
          reviewKey="decorDetails"
          label="Decor Details"
          value={decorDetails}
          placeholder="Enter details about Decor"
          inputType="textarea"
          onChange={setReview}
          isSubmitted={isSubmitted}
        />
        {!isSubmitted ? (
          <button type="button" onClick={onSubmit} aria-label="submit">
            Submit
          </button>
        ) : (
          <button type="button" onClick={onDelete} aria-label="delete">
            Delete
          </button>
        )}
      </form>
    </div>
  );
}
