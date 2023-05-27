import { FC } from "react";
import { useActions } from "../../hooks/useActions";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import style from "./GitHubOAuthBtn.module.css";
import gitHubIcon from "../../assets/icons/gitHub-icon.svg";

const GitHubBtnOAuthBtn: FC = () => {
  const navigate = useNavigate();

  const {
    gitHubLogIn,
    gitHubLogOut,
    clearRepositoryListData,
    changeAuthentication,
    changeAccessToken,
  } = useActions();

  const { isAuthenticated, access_token } = useAuthentication();

  const logOut = () => {
    gitHubLogOut();
    clearRepositoryListData();
    changeAuthentication(false);
    changeAccessToken("");
    navigate("/toolkit_test");
  };

  const actionOnClick = () => {
    isAuthenticated || access_token ? logOut() : gitHubLogIn();
  };

  const btnText = isAuthenticated || access_token ? "Sign out" : "Sign In";

  return (
    <button onClick={() => actionOnClick()} className={style.gitHubBtn}>
      <img src={gitHubIcon} alt="" />
      <span className={style.gitHubBtnText}>{btnText}</span>
    </button>
  );
};

export default GitHubBtnOAuthBtn;
