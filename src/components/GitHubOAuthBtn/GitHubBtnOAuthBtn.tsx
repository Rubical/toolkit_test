import { FC } from "react";
import gitHubIcon from "../../assets/icons/gitHub-icon.svg";
import style from "./GitHubOAuthBtn.module.css";
import { useActions } from "../../hooks/useActions";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

const GitHubBtnOAuthBtn: FC = () => {
  const {
    gitHubLogIn,
    gitHubLogOut,
    clearRepositoryListData,
    changeAuthentication,
    changeAccessToken,
  } = useActions();
  const { isAuthenticated, access_token } = useAuthentication();
  const navigate = useNavigate();

  const logOut = () => {
    gitHubLogOut();
    clearRepositoryListData();
    changeAuthentication(false);
    changeAccessToken("");
    navigate("/toolkit_test");
  };

  const action = () => {
    isAuthenticated || access_token ? logOut() : gitHubLogIn();
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
