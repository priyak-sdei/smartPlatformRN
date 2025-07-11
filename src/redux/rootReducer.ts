import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
});

export default rootReducer;
