import { combineReducers, configureStore } from "@reduxjs/toolkit";
import repositoriesReducer from "./repositories.slice";
import authenticationReducer from "./authentication.slice";

const rootReducer = combineReducers({
  repositories: repositoriesReducer,
  authentication: authenticationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
