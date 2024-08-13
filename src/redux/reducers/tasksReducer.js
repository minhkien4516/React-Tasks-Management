import {
  ADD_TASK,
  DELETE_TASK,
  FETCH_TASKS,
  TASKS_ERROR,
  FETCH_TASK_DETAIL,
  SET_LOADING,
  UPDATE_TASK,
  SET_IS_SUBMITTING_ADD,
  SET_IS_SUBMITTING_EDIT,
  FETCH_TASKS_BY_CATEGORY,
} from '../types/actionTypes';

const initialState = {
  tasks: [],
  errors: null,
  taskDetail: null,
  loading: false,
  isSubmittingAdd: false,
  isSubmittingEdit: false,
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case FETCH_TASK_DETAIL:
      return {
        ...state,
        taskDetail: action.payload,
      };
    case FETCH_TASKS_BY_CATEGORY:
      return {
        ...state,
        tasks: action.payload,
      };

    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    case TASKS_ERROR:
      return { ...state, errors: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_IS_SUBMITTING_ADD:
      return { ...state, isSubmittingAdd: action.payload };
    case SET_IS_SUBMITTING_EDIT:
      return { ...state, isSubmittingEdit: action.payload };
    default:
      return state;
  }
};

export default tasksReducer;
