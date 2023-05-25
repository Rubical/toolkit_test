import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as repositoriesActions from "../store/repositories.actions";
import * as authenticationActions from "../store/authentication.actions";
import { authenticationSlice } from "../store/authentication.slice";
import { repositoriesSlice } from "../store/repositories.slice";

const rootActions = {
  ...repositoriesActions,
  ...authenticationActions,
  ...authenticationSlice.actions,
  ...repositoriesSlice.actions,
};
export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
