import { FC } from "react";
import RepositoryListPage from "../pages/repositoryList/RepositoryListPage.";
import CurrentRepository from "../pages/currentRepository/CurrentRepository";

interface Routes {
  path: string;
  element: FC;
}

export const routes: Routes[] = [
  {
    path: "/toolkit_test",
    element: RepositoryListPage,
  },
  {
    path: "/toolkit_test/repository/:urlRepoName",
    element: CurrentRepository,
  },
];
