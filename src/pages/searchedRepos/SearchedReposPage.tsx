import { FC, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import style from "./SearchedRepos.module.css";
import Loader from "../../components/UI/loader/Loader";
import RepositoryCard from "../../components/RepositoryCard/RepositoryCard";
import Pagination from "../../components/UI/pagination/Pagination";
import { useSearchedRepos } from "../../hooks/useSearchedRepos";
import SearchRepoInput from "../../components/UI/input/SearchRepoInput";

const SearchedReposPage: FC = () => {
  const { fetchSearchedRepo, changeSearchedRepoPage } = useActions();
  const { loading, repositories, page, pageItemsLimit, totalCount } =
    useSearchedRepos();
  const navigate = useNavigate();
  const { searchedReposPage, searchedRepoName } = useParams();

  useMemo(() => fetchSearchedRepo(searchedRepoName!), [searchedRepoName]);

  useEffect(() => {
    if (searchedReposPage) changeSearchedRepoPage(Number(searchedReposPage));
  }, []);

  const changeSearchedReposPage = (page: number) => {
    navigate(`../toolkit_test/searched/${searchedRepoName}/${page}`);
    changeSearchedRepoPage(page);
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
            .map((repo) => <RepositoryCard key={repo.id} repo={repo} />)
        ) : repositories.length ? (
          repositories.map((repo) => (
            <RepositoryCard key={repo.id} repo={repo} />
          ))
        ) : (
          <div className={style.alertText}>
            По Вашему запросу ничего не найдено.
          </div>
        )}
      </div>
      {repositories.length ? (
        <Pagination
          totalItems={totalCount}
          pageItemsLimit={pageItemsLimit}
          page={page}
          changePage={changeSearchedReposPage}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default SearchedReposPage;
