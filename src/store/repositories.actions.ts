import { createAsyncThunk } from "@reduxjs/toolkit";
import { currentUserRepo } from "../utils/graph";
import { RootState } from "./store";
import { IUserRepositories } from "../types/types";

export const fetchUserRepositories = createAsyncThunk<
  IUserRepositories,
  void,
  { state: RootState }
>("repositories/fetchUserRepositories", async (__, thunkAPI) => {
  const query = currentUserRepo;
  const { authentication } = thunkAPI.getState();
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${authentication.access_token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    console.log("Server error!");
  }
  const data = await response.json();
  console.log(data.data.viewer.repositories);
  return data.data.viewer.repositories;
});