import { FC, useEffect } from "react";
import { useRepositoryList } from "../../hooks/useRepositoryList";
import RepositoryCard from "../../components/RepositoryCard/RepositoryCard";
import style from "./RepositoryListPage.module.css";
import Pagination from "../../components/UI/pagination/Pagination";
import Loader from "../../components/UI/loader/Loader";
import { supabase } from "../../supabase/client";
import { useActions } from "../../hooks/useActions";
import { useAuthentication } from "../../hooks/useAuthentication";

const RepositoryListPage: FC = () => {
  const {
    changeAuthentication,
    changeAccessToken,
    clearData,
    fetchUserRepositories,
  } = useActions();
  const { repositories, totalCount, page, pageItemsLimit, loading } =
    useRepositoryList();
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
      clearData();
      changeAuthentication(false);
      changeAccessToken("");
    }
  });

  useEffect(() => {
    if (access_token) fetchUserRepositories();
  }, [access_token]);
  return loading ? (
    <Loader />
  ) : (
    <section className={style.section}>
      <div className={style.container}>
        {repositories.length ? (
          repositories
            .slice(
              page * pageItemsLimit - pageItemsLimit,
              page * pageItemsLimit
            )
            .map((repo) => <RepositoryCard key={repo.name} repo={repo} />)
        ) : (
          <div className={style.alertText}>
            Чтобы увидеть Ваши репозитории, пожалуйста, авторизуйтесь с помощью
            GitHub или введите название любого публичного репозитория в
            поисковую строку.
          </div>
        )}
      </div>
      {repositories.length ? (
        <Pagination totalItems={totalCount} pageItemsLimit={pageItemsLimit} />
      ) : (
        ""
      )}
    </section>
  );
};

export default RepositoryListPage;
