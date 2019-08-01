import React, { memo, useCallback } from 'react';
import './FormRow.css';
import { ReviewDetail } from '../ReviewDetail';

export const detailsInput = [
  'surroundingAreaDetails',
  'constructionDetails',
  'decorDetails'
];

function _FormRow({
  label,
  value,
  placeholder,
  reviewKey,
  inputType = 'text',
  onChange,
  isSubmitted
}) {
  const onInputChange = useCallback(
    event => {
      if (detailsInput.includes(reviewKey)) {
        onChange({
          [reviewKey]: {
            ...value,
            value: event.target.value
          }
        });
      } else {
        onChange({ [reviewKey]: event.target.value });
      }
    },
    [value, onChange, reviewKey]
  );

  return (
    <div className="row-container">
      <label htmlFor={label}>{label}</label>
      {isSubmitted ? (
        inputType === 'textarea' ? (
          <ReviewDetail
            reviewKey={reviewKey}
            value={value}
            setComment={onChange}
          />
        ) : (
          <span>{value}</span>
        )
      ) : inputType === 'textarea' ? (
        <textarea
          rows={7}
          cols={30}
          placeholder={placeholder}
          defaultValue={value.value}
          onChange={onInputChange}
        />
      ) : (
        <input
          id={label}
          value={value}
          placeholder={placeholder}
          onChange={onInputChange}
          type={inputType}
        />
      )}
    </div>
  );
}

export const FormRow = memo(_FormRow);
