import { useTypedSelector } from "./useTypedSelector";

export const useSearchedRepos = () => {
  const repos = useTypedSelector((state) => state.searchedRepos);
  return repos;
};
