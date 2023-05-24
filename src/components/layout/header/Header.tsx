import { FC, useEffect, useState } from "react";
import style from "./Header.module.css";
import searchIcon from "./../../../assets/icons/search-icon.svg";
import { useActions } from "../../../hooks/useActions";
import GitHubBtnOAuthBtn from "../../GitHubOAuthBtn/GitHubBtnOAuthBtn";
import { supabase } from "../../../supabase/client";
import { useAuthentication } from "../../../hooks/useAuthentication";

const Header: FC = () => {
  const [value, setValue] = useState("");
  const { fetchUserRepositories, changeAuthentication, changeAccessToken } =
    useActions();
  const { access_token } = useAuthentication();

  supabase.auth.onAuthStateChange((event) => {
    if (event == "SIGNED_IN") {
      changeAuthentication(true);
      changeAccessToken(
        JSON.parse(localStorage.getItem("sb-blxlglcobnyhuhmfdsee-auth-token")!)
          ?.provider_token
      );
    }
  });

  supabase.auth.onAuthStateChange((event) => {
    if (event == "SIGNED_OUT") {
      changeAuthentication(false);
      changeAccessToken("");
    }
  });

  useEffect(() => {
    if (access_token) fetchUserRepositories();
  }, [access_token]);

  return (
    <header>
      <div className={style.container}>
        <div>
          <button className={style.navButton}>Главная</button>
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
