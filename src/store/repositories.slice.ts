import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserRepositories } from "./repositories.actions";
import { IUserRepositories, TypeNode, TypePageInfo } from "../types/types";

interface IState {
  repositories: TypeNode[];
  totalCount: number;
  pageInfo: TypePageInfo | "";
  loading: boolean;
  page: number;
  pageItemsLimit: number;
}

const initialState: IState = {
  repositories: [],
  pageInfo: "",
  loading: false,
  totalCount: 0,
  page: 1,
  pageItemsLimit: 1,
};

export const repositoriesSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {
    clearData: (state) => {
      state.repositories = [];
      state.totalCount = 0;
      state.pageInfo = "";
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
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
          state.pageInfo = action.payload.pageInfo;
          state.loading = false;
        }
      )
      .addCase(fetchUserRepositories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default repositoriesSlice.reducer;
