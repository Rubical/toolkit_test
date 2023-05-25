import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as repositoryListActions from "../store/repositoryList.actions";
import * as authenticationActions from "../store/authentication.actions";
import * as currentRepository from "../store/currentRepository.actions";

import { authenticationSlice } from "../store/authentication.slice";
import { repositoryListSlice } from "../store/repositoryList.slice";
import { currentRepositorySlice } from "../store/currentRepository.slice";

const rootActions = {
  ...repositoryListActions,
  ...authenticationActions,
  ...currentRepository,
  ...authenticationSlice.actions,
  ...repositoryListSlice.actions,
  ...currentRepositorySlice.actions,
};
export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
