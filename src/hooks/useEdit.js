import { useState } from 'react';

export const useEdit = () => {
  const [editMode, _setEditMode] = useState(false);
  const setEditMode = () => _setEditMode(!editMode);
  return { editMode, setEditMode };
};
