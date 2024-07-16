import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import booksReducer from './booksSlice';
import Cookies from 'js-cookie';

// Load the state from cookies
const loadState = () => {
  try {
    const serializedState = Cookies.get('auth');
    if (serializedState === undefined) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save the state to cookies
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    Cookies.set('auth', serializedState, { expires: 7 }); // Cookie expires in 7 days
  } catch (err) {
    // Ignore write errors
  }
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
  },
  preloadedState: {
    auth: loadState(),
  },
});

// Subscribe to store updates and save state to cookies
store.subscribe(() => {
  saveState(store.getState().auth);
});

export default store;
