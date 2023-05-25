import { FC } from "react";
import { useRepositories } from "../../hooks/useRepositories";
import RepositoryCard from "../../components/RepositoryCard/RepositoryCard";
import style from "./RepositoriesPage.module.css";
import Pagination from "../../components/UI/pagination/Pagination";

const RepositoriesPage: FC = () => {
  const { repositories, totalCount, page, pageItemsLimit } = useRepositories();
  return (
    <section>
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
      <Pagination totalItems={totalCount} pageItemsLimit={pageItemsLimit} />
    </section>
  );
};

export default RepositoriesPage;
