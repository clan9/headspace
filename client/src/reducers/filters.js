// Filters reducer
import {
  SET_TEXT_FILTER,
  SORT_BY_DATE,
  SORT_BY_LIKES,
  SORT_BY_COMMENTS
} from 'actions/types';

const initialState = {
  text: '',
  sortBy: 'date'
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_TEXT_FILTER:
      return { ...state, text: payload };
    case SORT_BY_DATE:
      return { ...state, sortBy: 'date' };
    case SORT_BY_LIKES:
      return { ...state, sortBy: 'likes' };
    case SORT_BY_COMMENTS:
      return { ...state, sortBy: 'comments' };
    default:
      return state;
  }
};
