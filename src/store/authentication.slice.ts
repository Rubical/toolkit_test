import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { gitHubLogIn } from "./authentication.actions";

interface IAuthenticationSlice {
  access_token: string;
  loading: boolean;
  isAuthenticated: boolean;
}

const initialState: IAuthenticationSlice = {
  access_token:
    JSON.parse(localStorage.getItem("sb-blxlglcobnyhuhmfdsee-auth-token")!)
      ?.provider_token || "",
  loading: false,
  isAuthenticated: false,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    changeAuthentication: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    changeAccessToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(gitHubLogIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(gitHubLogIn.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(gitHubLogIn.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authenticationSlice.reducer;
