import { FC } from "react";
import style from "./RepositoryCard.module.css";
import starIcon from "./../../assets/icons/star-icon.svg";
import getPrettyDate from "../../utils/getPrettyDate";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { INode } from "../../types/types";

interface IRepositoryCard {
  repo: INode;
}

const RepositoryCard: FC<IRepositoryCard> = ({ repo }) => {
  const navigate = useNavigate();
  const { changeCurrentRepoName } = useActions();
  return (
    <div className={style.card}>
      <button
        onClick={() => {
          changeCurrentRepoName(repo.name);
          navigate(`./repository/${repo.name}`);
        }}
        className={style.name}
      >
        {repo.name}
      </button>
      <div className={style.starsCountContainer}>
        <span className={style.starsCount}> {repo.stargazers.totalCount}</span>
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
