import { useState } from 'react';

export const useComment = () => {
  const [comment, setComment] = useState('');
  return { comment, setComment };
};
