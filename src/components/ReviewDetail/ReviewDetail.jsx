import React, {
  useCallback,
  useState,
  useRef,
  useMemo,
  useEffect
} from 'react';
import Popover from 'react-text-selection-popover';
import './ReviewDetail.css';
import editIcon from '../../edit-icon.svg';

const highLightedValueIdentifier = '__&&';

const initialHighlightedValue = {
  fromIndex: undefined,
  toIndex: undefined,
  comment: ''
};

const useHighlighter = () => {
  const [highlighted, _setHighlighted] = useState(initialHighlightedValue);
  const setHighlighted = newHighlighted =>
    _setHighlighted({ ...highlighted, ...newHighlighted });
  return { highlighted, setHighlighted };
};

export function ReviewDetail({ value, reviewKey }) {
  const reviewDetailRef = useRef(null);
  const { highlighted, setHighlighted } = useHighlighter();
  const { value: textValue = '' } = value;
  // const onMouseUp = useCallback
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
        setHighlighted={setHighlighted}
      />
    </div>
  );
}

function HighLightedLine({ textValue = '', highlighted }) {
  const highlightedLine = useMemo(() => {
    if (!highlighted.fromIndex && !highlighted.toIndex) {
      return textValue;
    }

    // Uncomment when multiple highlighting is supported
    // const sortedHighlighted = highlighted.sort((highlight1, highlight2) =>
    //   highlight1.fromIndex < highlight2.fromIndex ? -1 : 1
    // );
    // const mixedValue = [];
    // let unusedValue = textValue;
    // for (let i = 0; i < sortedHighlighted.length; i++) {
    //   const { fromIndex, toIndex } = sortedHighlighted[i];
    //   const nonHighlightedStartIndex = textValue.indexOf(unusedValue);
    //   mixedValue.push(textValue.slice(nonHighlightedStartIndex, fromIndex));
    //   mixedValue.push(
    //     `${highLightedValueIdentifier}${textValue.substring(
    //       fromIndex,
    //       toIndex
    //     )}`
    //   );
    //   unusedValue = textValue.slice(toIndex);
    // }
    // mixedValue.push(unusedValue);

    const { fromIndex, toIndex, comment } = highlighted;
    const mixedValue = [
      textValue.slice(0, fromIndex),
      `${highLightedValueIdentifier}${textValue.substring(fromIndex, toIndex)}`,
      textValue.slice(toIndex)
    ];

    return mixedValue.reduce((mixedText, text) => {
      if (!text) return mixedText;
      const textToReplace = text.startsWith(highLightedValueIdentifier) ? (
        <RecordedText
          text={text.replace(highLightedValueIdentifier, '')}
          comment={comment}
        />
      ) : (
        text
      );
      return [...mixedText, textToReplace];
    }, []);
  }, [textValue, highlighted]);

  return highlightedLine;
}

const useEdit = () => {
  const [editMode, _setEditMode] = useState(false);
  const setEditMode = () => _setEditMode(!editMode);
  return { editMode, setEditMode };
};

const useComment = () => {
  const [comment, setComment] = useState('');
  return { comment, setComment };
};

function RecordComment({ containerRef, setHighlighted }) {
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

function RecordedText({ text, comment }) {
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
