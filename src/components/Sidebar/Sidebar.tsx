import SideTab from "../SideTab/SideTab";
import styles from "./Sidebar.module.scss";

type DataType = {
  title: string;
  active: boolean;
};

const Sidebar = () => {
  const dataArray: DataType[] = [
    { title: "По проекту", active: false },
    { title: "Объекты", active: false },
    { title: "РД", active: false },
    { title: "МТО", active: false },
    { title: "СМР", active: true },
    { title: "График", active: false },
    { title: "МиМ", active: false },
    { title: "Рабочие", active: false },
    { title: "Капвложения", active: false },
    { title: "Бюджет", active: false },
    { title: "Финансирование", active: false },
    { title: "Панорамы", active: false },
    { title: "Камеры", active: false },
    { title: "Поручения", active: false },
    { title: "Контрагенты", active: false },
  ];

  return (
    <div className={styles.sidebar}>
      {dataArray.map((tab, index) => (
        <SideTab key={index} title={tab.title} active={tab.active} />
      ))}
    </div>
  );
};

export default Sidebar;
