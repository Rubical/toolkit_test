import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserRepositories } from "./repositories.actions";
import { IUserRepositories, TypeNode, TypePageInfo } from "../types/types";

interface IState {
  repositories: TypeNode[];
  totalCount: number;
  pageInfo: TypePageInfo | "";
  loading: boolean;
}

const initialState: IState = {
  repositories: [],
  totalCount: 0,
  pageInfo: "",
  loading: false,
};

export const repositoriesSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRepositories.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUserRepositories.fulfilled,
        (state, action: PayloadAction<IUserRepositories>) => {
          state.repositories = action.payload.nodes;
          state.loading = false;
        }
      )
      .addCase(fetchUserRepositories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default repositoriesSlice.reducer;
