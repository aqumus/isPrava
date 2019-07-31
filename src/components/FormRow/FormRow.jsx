import React, { memo } from 'react';
import './FormRow.css';
import { ReviewDetail } from '../ReviewDetail';

function _FormRow({
  label,
  value,
  placeholder,
  reviewKey,
  inputType = 'text',
  onChange,
  isSubmitted
}) {
  return (
    <div className="row-container">
      <label htmlFor={label}>{label}</label>
      {isSubmitted ? (
        <ReviewDetail>{value}</ReviewDetail>
      ) : inputType === 'textarea' ? (
        <textarea
          rows={7}
          cols={30}
          placeholder={placeholder}
          defaultValue={value}
          onChange={event => onChange({ [reviewKey]: event.target.value })}
        />
      ) : (
        <input
          id={label}
          value={value}
          placeholder={placeholder}
          onChange={event => onChange({ [reviewKey]: event.target.value })}
          type={inputType}
        />
      )}
    </div>
  );
}

export const FormRow = memo(_FormRow);
