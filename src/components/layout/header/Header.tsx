import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import style from "./Header.module.css";
import GitHubBtnOAuthBtn from "../../GitHubOAuthBtn/GitHubBtnOAuthBtn";

const Header: FC = () => {
  const navigate = useNavigate();

  const { changeRepositoryListPage, changeSearchedRepoPage } = useActions();

  return (
    <header>
      <div className={style.container}>
        <div>
          <button
            onClick={() => {
              changeRepositoryListPage(1);
              changeSearchedRepoPage(1);
              navigate("/toolkit_test");
            }}
            className={style.navButton}
          >
            Главная
          </button>
        </div>
        <GitHubBtnOAuthBtn />
      </div>
    </header>
  );
};

export default Header;
