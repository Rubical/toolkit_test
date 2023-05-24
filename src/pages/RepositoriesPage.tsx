import { FC } from "react";
import { useRepositories } from "../hooks/useRepositories";
import RepositoryCard from "../components/RepositoryCard/RepositoryCard";

const RepositoriesPage: FC = () => {
  const { repositories } = useRepositories();
  console.log(repositories);
  return (
    <section>
      {repositories.map((repo) => (
        <RepositoryCard key={repo.name} repo={repo} />
      ))}
    </section>
  );
};

export default RepositoriesPage;
