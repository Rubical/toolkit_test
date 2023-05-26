import { FC } from "react";
import UserReposPage from "../pages/userRepos/userReposPage";
import CurrentRepoPage from "../pages/currentRepo/CurrentRepoPage";
import SearchedReposPage from "../pages/searchedRepos/SearchedReposPage";

interface Routes {
  path: string;
  element: FC;
}

export const routes: Routes[] = [
  {
    path: "/toolkit_test/:userReposPage?",
    element: UserReposPage,
  },
  {
    path: "/toolkit_test/repository/:urlRepoName/",
    element: CurrentRepoPage,
  },
  {
    path: "/toolkit_test/searched/:searchedRepoName/:searchedReposPage?",
    element: SearchedReposPage,
  },
];
