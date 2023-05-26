import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserRepositories } from "./repositoryList.actions";
import { IUserRepositories, INode } from "../types/types";

interface IState {
  repositories: INode[];
  totalCount: number;
  loading: boolean;
  page: number;
  pageItemsLimit: number;
}

const initialState: IState = {
  repositories: [],
  loading: true,
  totalCount: 0,
  page: 1,
  pageItemsLimit: 6,
};

export const repositoryListSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {
    clearRepositoryListData: (state) => {
      state.repositories = [];
      state.totalCount = 0;
    },
    changeRepositoryListPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRepositories.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUserRepositories.fulfilled,
        (state, action: PayloadAction<IUserRepositories>) => {
          state.repositories = action.payload.nodes;
          state.totalCount = action.payload.totalCount;
          state.loading = false;
        }
      )
      .addCase(fetchUserRepositories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default repositoryListSlice.reducer;
