import React, { useMemo } from 'react';
import { RecordedText } from '../RecordedText';

export const highLightedValueIdentifier = '__&&';

export function HighLightedLine({ textValue = '', highlighted }) {
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
