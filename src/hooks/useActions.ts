import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as repositoryListActions from "../store/repositoryList.actions";
import * as authenticationActions from "../store/authentication.actions";
import * as currentRepositoryActions from "../store/currentRepository.actions";
import * as searchedReposActions from "../store/searchedRepos.actions";
import { authenticationSlice } from "../store/authentication.slice";
import { repositoryListSlice } from "../store/repositoryList.slice";
import { currentRepositorySlice } from "../store/currentRepository.slice";
import { searchedReposSlice } from "../store/searchedRepos.slice";

const rootActions = {
  ...repositoryListActions,
  ...authenticationActions,
  ...currentRepositoryActions,
  ...searchedReposActions,
  ...authenticationSlice.actions,
  ...repositoryListSlice.actions,
  ...currentRepositorySlice.actions,
  ...searchedReposSlice.actions,
};
export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
