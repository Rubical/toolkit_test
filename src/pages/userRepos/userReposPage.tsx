import { FC, useEffect } from "react";
import { supabase } from "../../supabase/client";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useRepositoryList } from "../../hooks/useRepositoryList";
import style from "./userReposPage.module.css";
import Pagination from "../../components/UI/pagination/Pagination";
import Loader from "../../components/UI/loader/Loader";
import RepositoryCard from "../../components/RepositoryCard/RepositoryCard";
import SearchRepoInput from "../../components/UI/input/SearchRepoInput";

const UserReposPage: FC = () => {
  const navigate = useNavigate();
  const { userReposPage } = useParams();

  const {
    changeAuthentication,
    changeAccessToken,
    clearRepositoryListData,
    fetchUserRepositories,
    changeRepositoryListPage,
    stopLoading,
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
      clearRepositoryListData();
      changeAuthentication(false);
      changeAccessToken("");
    }
  });

  useEffect(() => {
    if (!access_token) stopLoading();
    if (userReposPage) changeRepositoryListPage(Number(userReposPage));
  }, []);

  useEffect(() => {
    if (access_token) fetchUserRepositories();
  }, [access_token]);

  const changeUserReposPage = (page: number) => {
    navigate(`../toolkit_test/${page}`);
    changeRepositoryListPage(page);
  };

  return loading ? (
    <Loader />
  ) : (
    <section className={style.section}>
      <SearchRepoInput />
      <div className={style.container}>
        {repositories.length && repositories.length > pageItemsLimit ? (
          repositories
            .slice(
              page * pageItemsLimit - pageItemsLimit,
              page * pageItemsLimit
            )
            .map((repo) => <RepositoryCard key={repo.name} repo={repo} />)
        ) : repositories.length ? (
          repositories.map((repo) => (
            <RepositoryCard key={repo.name} repo={repo} />
          ))
        ) : (
          <div className={style.alertText}>
            Для работы приложения, пожалуйста, авторизуйтесь с помощью GitHub.
          </div>
        )}
      </div>
      {repositories.length ? (
        <Pagination
          totalItems={totalCount}
          pageItemsLimit={pageItemsLimit}
          changePage={changeUserReposPage}
          page={page}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default UserReposPage;
