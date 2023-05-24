import {FC} from 'react';
import style from './Footer.module.css'

const Footer: FC = () => {
    return (
        <footer>
            <div className={style.container}>Здесь могла быть Ваша реклама
            </div>
        </footer>
    );
};

export default Footer;
