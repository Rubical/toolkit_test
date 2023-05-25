import { useTypedSelector } from "./useTypedSelector";

export const useRepositoryList = () => {
  const userRepos = useTypedSelector((state) => state.repositoryList);
  return userRepos;
};
