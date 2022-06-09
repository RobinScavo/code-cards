import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import decksReducer from '../features/decks/decksSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    decks: decksReducer
  },
});
