import { useState } from 'react';

export const initialHighlightedValue = {
  fromIndex: undefined,
  toIndex: undefined,
  comment: ''
};

export const useHighlighter = (value = initialHighlightedValue) => {
  const [highlighted, setHighlighted] = useState(value);
  return { highlighted, setHighlighted };
};
