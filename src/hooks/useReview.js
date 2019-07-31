import { useState } from 'react';

export const initialReviewValue = {
  villaName: undefined,
  dateOfVisit: undefined,
  pincode: undefined,
  ownerName: undefined,
  surroundingAreaDetails: undefined,
  constructionDetails: undefined,
  decorDetails: undefined,
  isSubmitted: false
};

const mockReviewValue = {
  dateOfVisit: '2019-08-16',
  ownerName: 'Prabhat ',
  pincode: '545345',
  villaName: 'Prabhat',
  isSubmitted: false,
  constructionDetails:
    'Quisque sit amet tincidunt ligula. Maecenas volutpat, arcu sit amet iaculis scelerisque, nunc tellus accumsan massa, non interdum lectus massa ut nisl. Aliquam vitae tellus quis felis rhoncus commodo.\n\nIn hac habitasse platea dictumst. Vivamus vitae tincidunt nisi. Etiam non congue lectus. Duis lobortis sed mi at suscipit.',
  decorDetails:
    'Quisque sit amet tincidunt ligula. Maecenas volutpat, arcu sit amet iaculis scelerisque, nunc tellus accumsan massa, non interdum lectus massa ut nisl. Aliquam vitae tellus quis felis rhoncus commodo.\n\nIn hac habitasse platea dictumst. Vivamus vitae tincidunt nisi. Etiam non congue lectus. Duis lobortis sed mi at suscipit.',
  surroundingAreaDetails:
    'Quisque sit amet tincidunt ligula. Maecenas volutpat, arcu sit amet iaculis scelerisque, nunc tellus accumsan massa, non interdum lectus massa ut nisl. Aliquam vitae tellus quis felis rhoncus commodo.\n\nIn hac habitasse platea dictumst. Vivamus vitae tincidunt nisi.\nEtiam non congue lectus. Duis lobortis sed mi at suscipit.'
};

export function useReview(value = mockReviewValue) {
  const [state, setState] = useState(value);
  const setReview = value => {
    const updateValue = {
      ...state,
      ...value
    };
    setState(updateValue);
  };
  return { review: state, setReview };
}
