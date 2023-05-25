import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../supabase/client";

export const gitHubLogIn = createAsyncThunk(
  "authenticate/authenticateUser",
  async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:5173/toolkit_test",
        scopes: "repo user project",
      },
    });
  }
);

export const gitHubLogOut = createAsyncThunk(
  "authenticate/authenticateUser",
  async () => {
    await supabase.auth.signOut();
  }
);
