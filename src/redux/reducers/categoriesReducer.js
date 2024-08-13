import {
  CATEGORIES_ERROR,
  FETCH_CATEGORIES,
  SET_LOADING,
} from '../types/actionTypes';

const initialState = {
  categories: [],
  errors: null,
  loading: false,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case CATEGORIES_ERROR:
      return { ...state, errors: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default categoriesReducer;
