import styles from "./SideTab.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";

type SideTabProps = {
  title: string;
  active: boolean;
};

const SideTab = ({ title, active }: SideTabProps) => {
  return (
    <div className={`${styles.sidetab} ${active ? styles.active : null}`}>
      <DashboardIcon className={styles.sidebarIcon} />
      <p style={{ cursor: "pointer", pointerEvents: "auto" }}>{title}</p>
    </div>
  );
};

export default SideTab;
