import { useTypedSelector } from "./useTypedSelector";

export const useCurrentRepository = () => {
  const repo = useTypedSelector((state) => state.currentRepository);
  return repo;
};
