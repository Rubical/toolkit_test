import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSearchedRepo } from "../utils/graph";
import { RootState } from "./store";
import { TypeSearchedRepos } from "../types/types";

export const fetchSearchedRepo = createAsyncThunk<
  TypeSearchedRepos,
  string,
  { state: RootState }
>("searchedRepos/fetchSearchedRepos", async (value, thunkAPI) => {
  const { authentication } = thunkAPI.getState();
  const query = getSearchedRepo(value);
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
  return data.data.search;
});
