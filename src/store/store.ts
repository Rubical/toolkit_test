import { combineReducers, configureStore } from "@reduxjs/toolkit";
import repositoryListReducer from "./repositoryList.slice";
import authenticationReducer from "./authentication.slice";
import currentRepositoryReducer from "./currentRepository.slice";
import searchedReposReducer from "./searchedRepos.slice";

const rootReducer = combineReducers({
  repositoryList: repositoryListReducer,
  authentication: authenticationReducer,
  currentRepository: currentRepositoryReducer,
  searchedRepos: searchedReposReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
