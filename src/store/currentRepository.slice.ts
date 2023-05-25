import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentRepo } from "../types/types";
import { fetchCurrentRepo } from "./currentRepository.actions";

interface IState {
  repoName: string;
  loading: boolean;
  repoInfo: ICurrentRepo | null;
}

const initialState: IState = {
  repoName: "",
  loading: false,
  repoInfo: null,
};

export const currentRepositorySlice = createSlice({
  name: "currentRepo",
  initialState,
  reducers: {
    changeCurrentRepoName: (state, action: PayloadAction<string>) => {
      state.repoName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentRepo.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCurrentRepo.fulfilled,
        (state, action: PayloadAction<ICurrentRepo>) => {
          state.repoInfo = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCurrentRepo.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default currentRepositorySlice.reducer;
