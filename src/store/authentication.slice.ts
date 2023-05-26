import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthenticationSlice {
  access_token: string;
  isAuthenticated: boolean;
}

const initialState: IAuthenticationSlice = {
  access_token:
    JSON.parse(localStorage.getItem("sb-blxlglcobnyhuhmfdsee-auth-token")!)
      ?.provider_token || "",
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
});

export default authenticationSlice.reducer;
