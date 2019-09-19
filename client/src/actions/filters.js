// Filters actions
import {
  SET_TEXT_FILTER,
  SORT_BY_DATE,
  SORT_BY_LIKES,
  SORT_BY_COMMENTS
} from 'actions/types';

export const setTextFilter = text => {
  return { type: SET_TEXT_FILTER, payload: text };
};

export const sortByDate = () => {
  return { type: SORT_BY_DATE };
};

export const sortByLikes = () => {
  return { type: SORT_BY_LIKES };
};

export const sortByComments = () => {
  return { type: SORT_BY_COMMENTS };
};
