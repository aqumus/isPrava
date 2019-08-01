import { useState } from 'react';

export const initialHighlightedValue = {
  fromIndex: undefined,
  toIndex: undefined,
  comment: ''
};

export const useHighlighter = () => {
  const [highlighted, _setHighlighted] = useState(initialHighlightedValue);
  const setHighlighted = newHighlighted =>
    _setHighlighted({ ...highlighted, ...newHighlighted });
  return { highlighted, setHighlighted };
};
