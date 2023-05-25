import { FC, useEffect } from "react";
import { useCurrentRepository } from "../../hooks/useCurrentRepository";
import { useActions } from "../../hooks/useActions";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useParams } from "react-router-dom";
import style from "./CurrentRepository.module.css";
import Loader from "../../components/UI/loader/Loader";
import starIcon from "../../assets/icons/star-icon.svg";
import getPrettyDate from "../../utils/getPrettyDate";
import emptyAvatar from "./../../assets/empty-avatar.jpg";

const CurrentRepository: FC = () => {
  const { fetchCurrentRepo, changeCurrentRepoName } = useActions();
  const { repoInfo, loading } = useCurrentRepository();
  const { access_token } = useAuthentication();
  const { urlRepoName } = useParams();

  useEffect(() => {
    changeCurrentRepoName(urlRepoName!);
    if (access_token) fetchCurrentRepo();
    console.log(repoInfo);
  }, [access_token]);

  return loading ? (
    <Loader />
  ) : repoInfo ? (
    <section className={style.section}>
      <div className={style.container}>
        <div className={style.repoOwner}>
          <span className={style.repoOwnerName}>
            Repository owner-
            <a
              className={style.repoOwnerLink}
              href={repoInfo.collaborators.nodes[0].url}
            >
              {repoInfo.collaborators.nodes[0].name}
            </a>
          </span>

          <img
            className={style.repoOwnerImg}
            src={
              repoInfo.collaborators.nodes[0].avatarUrl
                ? repoInfo.collaborators.nodes[0].avatarUrl
                : emptyAvatar
            }
            alt="repo-owner"
          />
        </div>
        <div className={style.repoInfo}>
          <div className={style.repoName}>{repoInfo!.name}</div>
          <div className={style.starsCountContainer}>
            <span className={style.starsCount}>
              {repoInfo!.stargazers.totalCount}
            </span>
            <img className={style.starIcon} src={starIcon} alt="star-icon" />
          </div>
          <div className={style.description}>
            {repoInfo.description || "Описание отсутствует"}
          </div>
          <div className={style.updatedAt}>
            {getPrettyDate(new Date(repoInfo!.updatedAt))} - дата последнего
            коммита
          </div>
          <div className={style.languagesWrapper}>
            Использованные языки -
            {repoInfo.languages.nodes.map((el) => (
              <div className={style.languages}>{el.name}</div>
            ))}
          </div>
          <a href={repoInfo!.url} className={style.url}>
            {repoInfo!.url}
          </a>
        </div>
      </div>
    </section>
  ) : (
    <div></div>
  );
};

export default CurrentRepository;
