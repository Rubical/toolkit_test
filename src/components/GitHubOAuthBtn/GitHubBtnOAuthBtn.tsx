import { FC } from "react";
import gitHubIcon from "../../assets/icons/gitHub-icon.svg";
import style from "./GitHubOAuthBtn.module.css";
import { useActions } from "../../hooks/useActions";
import { useAuthentication } from "../../hooks/useAuthentication";

const GitHubBtnOAuthBtn: FC = () => {
  const { gitHubLogIn, gitHubLogOut } = useActions();
  const { isAuthenticated, access_token } = useAuthentication();

  const action = () => {
    isAuthenticated || access_token ? gitHubLogOut() : gitHubLogIn();
  };

  const text = isAuthenticated || access_token ? "Sign out" : "Sign In";

  return (
    <button onClick={() => action()} className={style.gitHubBtn}>
      <img src={gitHubIcon} alt="" />
      <span className={style.gitHubBtnText}>{text}</span>
    </button>
  );
};

export default GitHubBtnOAuthBtn;