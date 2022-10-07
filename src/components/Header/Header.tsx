import styles from "./Header.module.scss";
import AppsIcon from "@mui/icons-material/Apps";
import ReplyIcon from "@mui/icons-material/Reply";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "./avatar.png";

const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.headerTop__left}>
          <AppsIcon className={styles.appIcon} />
          <ReplyIcon className={styles.replyIcon} />
          <div className={`${styles.selected} ${styles.viewLink}`}>
            <p>Просмотр</p>
          </div>
          <div className={styles.viewLink}>
            <p>Управление</p>
          </div>
        </div>
        <div className={styles.headerTop__right}>
          <img src={Avatar} alt='avatar' />
          <p>Антон Петров</p>
          <ExpandMoreIcon />
        </div>
      </div>
      <div className={styles.headerBottom}>
        <div className={styles.headerBottom__left}>
          <div className={styles.nameWrapper}>
            <p>Название проекта</p>
            <p className={styles.abbri}>Аббревиатура</p>
          </div>
          <ExpandMoreIcon className={styles.moreBtn} />
        </div>
        <div className={styles.headerBottom__right}>
          <p>Строительно-монтажные работы</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
