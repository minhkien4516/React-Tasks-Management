import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';
import categoriesReducer from './categoriesReducer';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  tasks: tasksReducer,
});

export default rootReducer;
