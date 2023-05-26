import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDetailedRepoCard } from "../utils/graph";
import { RootState } from "./store";
import { ICurrentRepo } from "../types/types";

export const fetchCurrentRepo = createAsyncThunk<
  ICurrentRepo,
  void,
  { state: RootState }
>("currentRepo/fetchCurrentRepo", async (__, thunkAPI) => {
  const { authentication, currentRepository } = thunkAPI.getState();
  const query = getDetailedRepoCard(currentRepository.id);
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
  return data.data.node;
});
