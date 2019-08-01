import React, { useRef, useCallback, useEffect, useState } from 'react';
import Popover from 'react-text-selection-popover';

export function RecordedText({ text, comment }) {
  const recordedTextRef = useRef(null);
  const commentRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const onRecordedTextClick = useCallback(() => {
    setOpen(true);
  }, [setOpen]);
  const outsideClickHandler = () => setOpen(false);
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', outsideClickHandler);
    } else {
      document.removeEventListener('click', outsideClickHandler);
    }
    return () => document.removeEventListener('click', outsideClickHandler);
  }, [isOpen]);

  return (
    <span
      className="commented-review"
      key={text}
      ref={recordedTextRef}
      onClick={onRecordedTextClick}
    >
      {text}
      <Popover selectionRef={recordedTextRef} isOpen={isOpen}>
        <div className="recorded-comment" ref={commentRef}>
          {comment}
        </div>
      </Popover>
    </span>
  );
}
