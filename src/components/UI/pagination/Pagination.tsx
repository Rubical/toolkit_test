import { FC } from "react";
import style from "./Pagination.module.css";
import { useActions } from "../../../hooks/useActions";
import { useRepositoryList } from "../../../hooks/useRepositoryList";
import vectorRight from "./../../../assets/icons/vector-right.svg";
import vectorLeft from "./../../../assets/icons/vector-left.svg";

interface IPagination {
  totalItems: number;
  pageItemsLimit: number;
}

const Pagination: FC<IPagination> = ({ totalItems, pageItemsLimit }) => {
  const totalPages: number = Math.ceil(totalItems / pageItemsLimit);
  const { page } = useRepositoryList();
  const { changePage } = useActions();
  const arrOfPages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const lastPage = arrOfPages[arrOfPages.length - 1];
  const pagesToShow =
    arrOfPages.length > 10
      ? page === 1 || page === 2 || page === lastPage
        ? [
            ...arrOfPages.slice(0, 4),
            ...arrOfPages.slice(arrOfPages.length - 3, arrOfPages.length),
          ]
        : page === 3
        ? [
            ...arrOfPages.slice(0, 2),
            ...arrOfPages.slice(page - 1, page),
            ...arrOfPages.slice(page, page + 2),
            ...arrOfPages.slice(arrOfPages.length - 2, arrOfPages.length),
          ]
        : page === arrOfPages[arrOfPages.length - 3]
        ? [
            ...arrOfPages.slice(0, 2),
            ...arrOfPages.slice(page - 3, page),
            ...arrOfPages.slice(page, page),
            ...arrOfPages.slice(arrOfPages.length - 2, arrOfPages.length),
          ]
        : page === arrOfPages[arrOfPages.length - 2]
        ? [
            ...arrOfPages.slice(0, 4),
            ...arrOfPages.slice(arrOfPages.length - 3, arrOfPages.length),
          ]
        : [
            ...arrOfPages.slice(0, 2),
            ...arrOfPages.slice(page - 2, page),
            ...arrOfPages.slice(page, page + 1),
            ...arrOfPages.slice(arrOfPages.length - 2, arrOfPages.length),
          ]
      : arrOfPages;

  return (
    <div className={style.pagination}>
      <button
        onClick={() => {
          if (page !== 1) changePage(page - 1);
        }}
      >
        <img
          className={page === 1 ? style.vectorDisabled : style.vector}
          src={vectorLeft}
        />
      </button>
      {pagesToShow.map((el) => (
        <button
          key={el}
          onClick={() => {
            changePage(el);
            window.scroll(0, 0);
          }}
          className={
            el === page
              ? `${style.activePageButton} ${style.pageButton}`
              : style.pageButton
          }
        >
          {el}
        </button>
      ))}
      <button
        onClick={() => {
          if (page !== lastPage) changePage(page + 1);
        }}
      >
        <img
          className={page === lastPage ? style.vectorDisabled : style.vector}
          src={vectorRight}
        />
      </button>
    </div>
  );
};

export default Pagination;
