import { combineReducers, configureStore } from "@reduxjs/toolkit";
import repositoryListReducer from "./repositoryList.slice";
import authenticationReducer from "./authentication.slice";
import currentRepositoryReducer from "./currentRepository.slice";

const rootReducer = combineReducers({
  repositoryList: repositoryListReducer,
  authentication: authenticationReducer,
  currentRepository: currentRepositoryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
