import { FC } from "react";
import { TypeNode } from "../../types/types";
import style from "./RepositoryCard.module.css";
import starIcon from "./../../assets/icons/star-icon.svg";
import getPrettyDate from "../../utils/getPrettyDate";

interface IRepositoryCard {
  repo: TypeNode;
}

const RepositoryCard: FC<IRepositoryCard> = ({ repo }) => {
  return (
    <div className={style.card}>
      <div className={style.name}>{repo.name}</div>
      <div className={style.starsCount}>
        {repo.stargazers.totalCount}
        <img className={style.starIcon} src={starIcon} alt="star-icon" />
      </div>
      <div className={style.updatedAt}>
        {getPrettyDate(new Date(repo.updatedAt))} - дата последнего коммита
      </div>
      <a href={repo.url} className={style.url}>
        {repo.url}
      </a>
    </div>
  );
};

export default RepositoryCard;
