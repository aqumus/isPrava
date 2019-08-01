import React, { useCallback, useState } from 'react';
import Popover from 'react-text-selection-popover';
import { initialHighlightedValue, useComment, useEdit } from '../../hooks';
import editIcon from '../../edit-icon.svg';
import './RecordComment.css';

export function RecordComment({ containerRef, setHighlighted }) {
  const { editMode, setEditMode } = useEdit();
  const [isOpen, setOpen] = useState(false);
  const { comment, setComment } = useComment();
  const onTextSelect = useCallback(() => {
    const selectedText = getSelection().toString();
    // ignore clicks firing mouseUp events
    if (!selectedText) setOpen(false);

    const { startContainer, endContainer } = getSelection().getRangeAt(0);
    // Ignore selection across other reviews i.e allow selection from single review details
    if (startContainer !== endContainer) setOpen(false);

    setOpen(true);
  }, [setOpen]);

  const onEditMode = useCallback(() => {
    const { startOffset, endOffset } = getSelection().getRangeAt(0);
    setEditMode();
    setHighlighted({ fromIndex: startOffset, toIndex: endOffset });
  }, [setHighlighted, setEditMode]);

  const onTextAreaChange = useCallback(
    event => {
      setComment(event.target.value);
    },
    [setComment]
  );

  return (
    <Popover
      selectionRef={containerRef}
      isOpen={isOpen}
      onTextSelect={onTextSelect}
      onTextUnSelect={() => {
        if (!editMode) setOpen(false);
      }}
    >
      {editMode ? (
        <div className="record-comment-container">
          <textarea onChange={onTextAreaChange}>{comment}</textarea>
          <footer>
            <span
              onClick={() => {
                setHighlighted({ comment });
                setOpen(false);
                setEditMode(false);
              }}
            >
              {'\u2714'}
            </span>
            <span
              onClick={() => {
                setComment('');
                setHighlighted(initialHighlightedValue);
                setOpen(false);
                setEditMode(false);
              }}
            >
              {'\u2718'}
            </span>
          </footer>
        </div>
      ) : (
        <span className="edit" onClick={onEditMode}>
          <img src={editIcon} className="edit-icon" alt="Edit" />
        </span>
      )}
    </Popover>
  );
}
