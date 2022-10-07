import { NewRowData } from "../../interfaces/interfaces";
import Row from "../Row/Row";
import styles from "./Table.module.scss";

type TableProps = {
  data: NewRowData[];
  saveRow: (data: NewRowData) => void;
  handleRowClick: (id: number, parent: number) => void;
  handleLevelClick: (id: number, parent: number) => void;
  handleTopLevelClick: (id: number, parent: null) => void;
};

const Table = ({
  data,
  saveRow,
  handleRowClick,
  handleLevelClick,
  handleTopLevelClick
}: TableProps): JSX.Element => {
  return (
    <div className={styles.table}>
      <div className={styles.tableHead}>
        <p>Уровень</p>
        <p>Наименование работ</p>
        <p>Ед. изм.</p>
        <p>Количество</p>
        <p>Цена за ед.</p>
        <p>Стоимость</p>
      </div>
      {data.map((row: NewRowData, index) => {
        return (
          <Row
            key={index}
            id={row.id}
            title={row.title}
            unit={row.unit}
            quantity={row.quantity}
            unitPrice={row.unitPrice}
            price={row.price}
            parent={row.parent}
            type={row.type}
            childs={row.childs}
            editing={row.editing}
            saveRow={saveRow}
            handleRowClick={handleRowClick}
            handleLevelClick={handleLevelClick}
            handleTopLevelClick={handleTopLevelClick}
          />
        );
      })}
    </div>
  );
};

export default Table;
