import { NewRowData } from "../../interfaces/interfaces";
import Row from "../Row/Row";
import styles from "./Table.module.scss";

type TableProps = {
  data: NewRowData[];
  saveRow: (data: NewRowData) => void;
  addNewLevel: (id: number, parent: number | null) => void;
  addNewRow: (id: number, parent: number | null) => void;
};

const Table = ({ data, saveRow, addNewLevel, addNewRow }: TableProps): JSX.Element => {
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
            addNewLevel={addNewLevel}
            addNewRow={addNewRow}
          />
        );
      })}
    </div>
  );
};

export default Table;
