import { FC } from "react";
import style from "./Loader.module.css";

const Loader: FC = () => {
  return (
    <div className={style.container}>
      <div className={style.loader}></div>
    </div>
  );
};

export default Loader;
