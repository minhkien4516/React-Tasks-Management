import axios from 'axios';
import {
  ADD_TASK,
  DELETE_TASK,
  FETCH_TASK_DETAIL,
  FETCH_TASKS,
  TASKS_ERROR,
  SET_LOADING,
  SET_IS_SUBMITTING_ADD,
  SET_IS_SUBMITTING_EDIT,
  UPDATE_TASK,
  FETCH_TASKS_BY_CATEGORY,
} from '../types/actionTypes';
import { notifyErrorToast, showToastMessage } from '../../common/ToastMessage';

const API_URL = 'https://66a84c5953c13f22a3d2447f.mockapi.io/api/v1/tasks';

export const fetchTasks = (sortOrder) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await axios.get(API_URL + '/');
    if (data.length > 0) {
      data.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return sortOrder == 'desc' ? dateB - dateA : dateA - dateB;
      });
    }
    dispatch({ type: FETCH_TASKS, payload: data });
    dispatch({ type: SET_LOADING, payload: false });
    localStorage.setItem('tasks', JSON.stringify(data));
    showToastMessage('Fetching Tasks Successfully');
  } catch (error) {
    dispatch({ type: TASKS_ERROR, payload: error.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const fetchTaskDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await axios.get(API_URL + '/' + `${id}`);
    dispatch({ type: FETCH_TASK_DETAIL, payload: data });
    dispatch({ type: SET_LOADING, payload: false });
    showToastMessage('Fetching Task Successfully');
  } catch (error) {
    dispatch({ type: TASKS_ERROR, payload: error.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const fetchTaskByCategory =
  (category, sortOrder) => async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const { data } = await axios.get(API_URL + `?category=${category}`);
      if (data.length > 0) {
        data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);

          return sortOrder == 'desc' ? dateB - dateA : dateA - dateB;
        });
      }
      dispatch({ type: FETCH_TASKS_BY_CATEGORY, payload: data });
      dispatch({ type: SET_LOADING, payload: false });
    } catch (error) {
      notifyErrorToast('No Data Found!');
      const { data } = await axios.get(API_URL + '/');
      dispatch({ type: FETCH_TASKS, payload: data });
      dispatch({ type: SET_LOADING, payload: false });
      localStorage.setItem('tasks', JSON.stringify(data));
      // showToastMessage('Fetching Tasks Successfully');
      dispatch({ type: TASKS_ERROR, payload: error.message });
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

export const addTask = (taskData) => async (dispatch) => {
  try {
    dispatch({ type: SET_IS_SUBMITTING_ADD, payload: true });
    const { data } = await axios.post(API_URL + '/', { ...taskData });
    dispatch({ type: ADD_TASK, payload: data });
  } catch (error) {
    dispatch({ type: TASKS_ERROR, payload: error.message });
  } finally {
    dispatch({ type: SET_IS_SUBMITTING_ADD, payload: false });
  }
};

export const updateTask = (id, taskData) => async (dispatch) => {
  try {
    dispatch({ type: SET_IS_SUBMITTING_EDIT, payload: true });
    const { data } = await axios.put(API_URL + '/' + `${id}`, { ...taskData });
    dispatch({ type: UPDATE_TASK, payload: data });
  } catch (error) {
    dispatch({ type: TASKS_ERROR, payload: error.message });
  } finally {
    dispatch({ type: SET_IS_SUBMITTING_EDIT, payload: false });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(API_URL + '/' + `${id}`);
    dispatch({ type: DELETE_TASK, payload: data });
  } catch (error) {
    dispatch({ type: TASKS_ERROR, payload: error.message });
  }
};
