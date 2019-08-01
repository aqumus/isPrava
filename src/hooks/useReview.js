import { useState } from 'react';
import config from '../config';
import { Persistence } from '../services';
import { initialHighlightedValue } from './useHighlighter';

const { persistenceKey } = config;

export const initialReviewValue = {
  villaName: undefined,
  dateOfVisit: undefined,
  pincode: undefined,
  ownerName: undefined,
  surroundingAreaDetails: { value: '', highlighted: initialHighlightedValue },
  constructionDetails: { value: '', highlighted: initialHighlightedValue },
  decorDetails: { value: '', highlighted: initialHighlightedValue },
  isSubmitted: false
};

const mockReviewValue = {
  dateOfVisit: '2019-08-16',
  ownerName: 'Prabhat ',
  pincode: '545345',
  villaName: 'Prabhat',
  isSubmitted: false,
  constructionDetails: {
    value:
      'Quisque sit amet tincidunt ligula. Maecenas volutpat, arcu sit amet iaculis scelerisque, nunc tellus accumsan massa, non interdum lectus massa ut nisl. Aliquam vitae tellus quis felis rhoncus commodo.\n\nIn hac habitasse platea dictumst. Vivamus vitae tincidunt nisi. Etiam non congue lectus. Duis lobortis sed mi at suscipit.',
    highlighted: []
  },
  decorDetails: {
    value:
      'Quisque sit amet tincidunt ligula. Maecenas volutpat, arcu sit amet iaculis scelerisque, nunc tellus accumsan massa, non interdum lectus massa ut nisl. Aliquam vitae tellus quis felis rhoncus commodo.\n\nIn hac habitasse platea dictumst. Vivamus vitae tincidunt nisi. Etiam non congue lectus. Duis lobortis sed mi at suscipit.',
    highlighted: []
  },
  surroundingAreaDetails: {
    value:
      'Quisque sit amet tincidunt ligula. Maecenas volutpat, arcu sit amet iaculis scelerisque, nunc tellus accumsan massa, non interdum lectus massa ut nisl. Aliquam vitae tellus quis felis rhoncus commodo.\n\nIn hac habitasse platea dictumst. Vivamus vitae tincidunt nisi.\nEtiam non congue lectus. Duis lobortis sed mi at suscipit.',
    highlighted: []
  }
};

export function useReview(
  value = Persistence.get(persistenceKey) || initialReviewValue
) {
  // Decide whether to use mock data or not, used only for development
  const paramObj = getParamObjFromHref();
  const initialValue = paramObj['mock'] === 'true' ? mockReviewValue : value;

  const [state, setState] = useState(initialValue);
  const setReview = value => {
    const updateValue = {
      ...state,
      ...value
    };
    setState(updateValue);
  };
  return { review: state, setReview };
}

function getParamObjFromHref() {
  const params = window.location.href.split('?')[1];
  const paramsArray = (params && params.split('&')) || [];
  return paramsArray.reduce((paramsObj, param) => {
    const [paramKey, paramValue] = param.split('=');
    return {
      ...paramsObj,
      [paramKey]: paramValue
    };
  }, {});
}
