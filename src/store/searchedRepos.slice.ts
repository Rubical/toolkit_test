import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INode, TypeSearchedRepos } from "../types/types";
import { fetchSearchedRepo } from "./searchedRepos.actions";

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

export const searchedReposSlice = createSlice({
  name: "searchedRepos",
  initialState,
  reducers: {
    clearSearchedData: (state) => {
      state.repositories = [];
      state.totalCount = 0;
    },
    changeSearchedRepoPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchedRepo.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSearchedRepo.fulfilled,
        (state, action: PayloadAction<TypeSearchedRepos>) => {
          state.repositories = action.payload.nodes;
          state.totalCount = action.payload.repositoryCount;
          state.loading = false;
        }
      )
      .addCase(fetchSearchedRepo.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default searchedReposSlice.reducer;
