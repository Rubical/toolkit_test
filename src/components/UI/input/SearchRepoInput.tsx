import React, { FC, useState } from "react";
import style from "../../UI/input/SearchRepoInput.module.css";
import searchIcon from "../../../assets/icons/search-icon.svg";
import { useActions } from "../../../hooks/useActions";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

const SearchRepoInput: FC = () => {
  const [value, setValue] = useState("");
  const { fetchSearchedRepo, changeSearchedRepoPage } = useActions();
  const { access_token } = useAuthentication();
  const navigate = useNavigate();

  const searchRepo = () => {
    if (value.length && access_token) {
      fetchSearchedRepo(value);
      changeSearchedRepoPage(1);
      navigate(`../toolkit_test/searched/${value}`);
      setValue("");
    } else if (access_token) {
      setValue("");
      alert("Пожалуйста, введите название!");
    } else {
      setValue("");
      alert("Пожалуйста, авторизуйтесь!");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchRepo();
    }
  };

  return (
    <div className={style.searchInputContainer}>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={(event) => handleKeyDown(event)}
        className={style.searchInput}
        type="text"
        placeholder="Введите название"
      />
      <button
        onClick={() => {
          searchRepo();
        }}
      >
        <img className={style.searchIcon} src={searchIcon} alt="search-icon" />
      </button>
    </div>
  );
};

export default SearchRepoInput;
