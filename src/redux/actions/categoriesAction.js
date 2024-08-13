import axios from 'axios';
import {
  CATEGORIES_ERROR,
  FETCH_CATEGORIES,
  SET_LOADING,
} from '../types/actionTypes';

const API_URL =
  'https://66a84c5953c13f22a3d2447f.mockapi.io/api/v1/categories/';

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await axios.get(API_URL);
    dispatch({ type: FETCH_CATEGORIES, payload: data });
    dispatch({ type: SET_LOADING, payload: false });
    localStorage.setItem('categories', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: CATEGORIES_ERROR, payload: error.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
