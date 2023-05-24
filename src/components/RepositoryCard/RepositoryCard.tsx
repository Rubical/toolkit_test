import { FC } from "react";
import { TypeNode } from "../../types/types";
import style from "./RepositoryCard.module.css";

interface IRepositoryCard {
  repo: TypeNode;
}

const RepositoryCard: FC<IRepositoryCard> = ({ repo }) => {
  return (
    <div className={style.card}>
      <div>{repo.name}</div>
      <div>{repo.stargazers.totalCount}</div>
      <div>{repo.updatedAt}</div>
      <div>{repo.url}</div>
    </div>
  );
};

export default RepositoryCard;
