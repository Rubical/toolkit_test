import { FC } from "react";
import style from "./Pagination.module.css";
import vectorRight from "./../../../assets/icons/vector-right.svg";
import vectorLeft from "./../../../assets/icons/vector-left.svg";

interface IPagination {
  totalItems: number;
  pageItemsLimit: number;
  page: number;
  changePage: (page: number) => void;
}

const Pagination: FC<IPagination> = ({
  totalItems,
  pageItemsLimit,
  changePage,
  page,
}) => {
  const totalPages: number =
    totalItems > 100
      ? Math.ceil(100 / pageItemsLimit)
      : Math.ceil(totalItems / pageItemsLimit);
  const arrOfPages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const lastPage = arrOfPages[arrOfPages.length - 1];
  const pagesToShow =
    arrOfPages.length > 10
      ? page === 1 || page === 2 || page === lastPage
        ? [
            ...arrOfPages.slice(0, 3),
            "divider",
            ...arrOfPages.slice(arrOfPages.length - 3, arrOfPages.length),
          ]
        : page === 3
        ? [
            ...arrOfPages.slice(0, 4),
            "divider",
            ...arrOfPages.slice(arrOfPages.length - 2, arrOfPages.length),
          ]
        : page === arrOfPages[arrOfPages.length - 3]
        ? [
            ...arrOfPages.slice(0, 2),
            "divider",
            ...arrOfPages.slice(arrOfPages.length - 4, arrOfPages.length),
          ]
        : page === arrOfPages[arrOfPages.length - 2]
        ? [
            ...arrOfPages.slice(0, 3),
            "divider",
            ...arrOfPages.slice(arrOfPages.length - 3, arrOfPages.length),
          ]
        : [
            ...arrOfPages.slice(0, 1),
            "divider1",
            ...arrOfPages.slice(page - 2, page + 1),
            "divider2",
            ...arrOfPages.slice(arrOfPages.length - 1, arrOfPages.length),
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
      {pagesToShow.map((el) =>
        typeof el !== "number" ? (
          <div className={style.pageDivider} key={el}>
            ...
          </div>
        ) : (
          <button
            key={el}
            onClick={() => {
              changePage(el);
            }}
            className={
              el === page
                ? `${style.activePageButton} ${style.pageButton}`
                : style.pageButton
            }
          >
            {el}
          </button>
        )
      )}
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
