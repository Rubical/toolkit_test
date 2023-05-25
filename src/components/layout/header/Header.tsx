import { FC, useState } from "react";
import style from "./Header.module.css";
import searchIcon from "./../../../assets/icons/search-icon.svg";
import { useActions } from "../../../hooks/useActions";
import GitHubBtnOAuthBtn from "../../GitHubOAuthBtn/GitHubBtnOAuthBtn";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const [value, setValue] = useState("");
  const { fetchUserRepositories } = useActions();
  const navigate = useNavigate();

  return (
    <header>
      <div className={style.container}>
        <div>
          <button
            onClick={() => navigate("/toolkit_test")}
            className={style.navButton}
          >
            Главная
          </button>
        </div>
        <div className={style.searchInputContainer}>
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className={style.searchInput}
            type="text"
            placeholder="Введите название"
          />
          <button
            onClick={() => {
              console.log(fetchUserRepositories());
            }}
          >
            <img
              className={style.searchIcon}
              src={searchIcon}
              alt="search-icon"
            />
          </button>
        </div>
        <GitHubBtnOAuthBtn />
      </div>
    </header>
  );
};

export default Header;
