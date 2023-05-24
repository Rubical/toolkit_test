import { useTypedSelector } from "./useTypedSelector";

export const useAuthentication = () => {
  const authentication = useTypedSelector((state) => state.authentication);
  return authentication;
};
