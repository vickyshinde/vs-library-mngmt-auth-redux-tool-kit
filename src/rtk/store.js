import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { booksApi } from "./booksSlice";
import authReducer from "./authSlice";
import Cookies from "js-cookie";

// Create the logger middleware

const logger = createLogger({
  level: "info",
  collapsed: true,

  // to show the difference between what changed in state
  diff: true,
  
  // to log time
  duration: true,
  timestamp: true,

  // custom colors for each log
  colors: {
    title: () => "#0f1842",
    prevState: () => "#de6f0d",
    action: () => "#6e13ab",
    nextState: () => "#1a9134",
  },
});
// Custom logger
// https://javascript.plainenglish.io/redux-logger-your-next-debugging-tool-the-art-of-logging-e1999cbbd146

// Load the state from cookies
const loadState = () => {
  try {
    const serializedState = Cookies.get("auth");
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
    Cookies.set("auth", serializedState, { expires: 7 }); // Cookie expires in 7 days
  } catch (err) {
    // Ignore write errors
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  [booksApi.reducerPath]: booksApi.reducer,
});

const middleware = (getDefaultMiddleware) => {
  // console.log("🚀 ~ middleware ~ process.env.NODE_ENV:", process.env.NODE_ENV)
  if (process.env.NODE_ENV !== "production") {
    return getDefaultMiddleware().concat(booksApi.middleware, logger);
  }
  return getDefaultMiddleware().concat(booksApi.middleware);
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware,
  preloadedState: {
    auth: loadState(),
  },
});

// Subscribe to store updates and save state to cookies
store.subscribe(() => {
  saveState(store.getState().auth);
});

export default store;
