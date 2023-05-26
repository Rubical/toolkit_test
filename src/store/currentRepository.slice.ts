import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentRepo } from "../types/types";
import { fetchCurrentRepo } from "./currentRepository.actions";

interface IState {
  id: string;
  loading: boolean;
  repoInfo: ICurrentRepo | null;
}

const initialState: IState = {
  id: "",
  loading: true,
  repoInfo: null,
};

export const currentRepositorySlice = createSlice({
  name: "currentRepo",
  initialState,
  reducers: {
    changeCurrentRepoId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
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
