import { FC, useEffect } from "react";
import { useCurrentRepository } from "../../hooks/useCurrentRepository";
import { useActions } from "../../hooks/useActions";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useParams } from "react-router-dom";
import style from "./CurrentRepoPage.module.css";
import starIcon from "../../assets/icons/star-icon.svg";
import blankUser from "./../../assets/blank-user.svg";
import getPrettyDate from "../../utils/getPrettyDate";
import Loader from "../../components/UI/loader/Loader";

const CurrentRepoPage: FC = () => {
  const { urlRepoName } = useParams();

  const { fetchCurrentRepo, changeCurrentRepoId } = useActions();

  const { access_token } = useAuthentication();

  const { repoInfo, loading } = useCurrentRepository();

  useEffect(() => {
    if (urlRepoName) changeCurrentRepoId(urlRepoName);
    if (access_token) fetchCurrentRepo();
    window.scroll(0, 0);
  }, [access_token]);

  return loading ? (
    <Loader />
  ) : repoInfo ? (
    <section className={style.section}>
      <div className={style.container}>
        <div className={style.repoOwner}>
          {repoInfo.collaborators ? (
            <a
              className={style.repoOwnerLink}
              href={repoInfo.collaborators.nodes[0].url}
            >
              {repoInfo.collaborators.nodes[0].name}
            </a>
          ) : (
            <p className={style.repoOwnerName}>Владелец не указан</p>
          )}
          <img
            className={style.repoOwnerImg}
            src={
              repoInfo.collaborators
                ? repoInfo.collaborators.nodes[0].avatarUrl
                : blankUser
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
          {repoInfo.languages.nodes.length ? (
            <div className={style.languagesWrapper}>
              Использованные языки:
              <div className={style.languagesRow}>
                {repoInfo.languages.nodes.map((el) => (
                  <div className={style.languages} key={el.name}>
                    {el.name}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}

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

export default CurrentRepoPage;
