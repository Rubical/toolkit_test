import { useTypedSelector } from "./useTypedSelector";

export const useRepositories = () => {
  const userRepos = useTypedSelector((state) => state.repositories);
  return userRepos;
};
