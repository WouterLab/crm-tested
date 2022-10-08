import BlueFolder from "./BlueFolder.png";
import Docs from "./Docs.png";
import GreenFolder from "./GreenFolder.png";
import styles from "./Row.module.scss";
import { NewRowData } from "../../interfaces/interfaces";
import { useState } from "react";

interface RowProps extends NewRowData {
  key: number;
  saveRow: (data: NewRowData) => void;
  addNewLevel: (id: number, parent: number | null) => void
  addNewRow: (id: number, parent: number | null) => void
}

const Row = ({
  title,
  unit,
  quantity,
  unitPrice,
  price,
  id,
  parent,
  type,
  editing,
  saveRow,
  addNewLevel,
  addNewRow
}: RowProps): JSX.Element => {
  const [isEditable, setIsEditable] = useState(editing);
  const [showIcon, setShowIcon] = useState(false);
  const [rowData, setRowData] = useState({
    id,
    title,
    unit,
    quantity,
    unitPrice,
    price,
    parent,
    type,
    editing,
  });

  const calculateRows = {
    marginLeft:
      parent === null
        ? "0"
        : parent === 1111
        ? "20px"
        : parent === 2222
        ? "40px"
        : "60px",
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    switch (event.detail) {
      case 1: {
        break;
      }
      case 2: {
        setIsEditable(true);
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (event.key === "Enter") {
      setIsEditable(false);
      saveRow(rowData);
    }
  };

  return (
    <>
      {isEditable && type === "row" && (
        <div className={styles.row}>
          <div style={calculateRows}>
            <img src={Docs} alt='docs' />
          </div>
          <div className={styles.inputWrapper}>
            <input
              value={rowData.title}
              className={styles.input}
              type='text'
              placeholder={title}
              onChange={(e): void =>
                setRowData({ ...rowData, title: e.target.value })
              }
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              value={rowData.unit}
              className={styles.input}
              type='text'
              placeholder={unit}
              onChange={(e): void =>
                setRowData({ ...rowData, unit: e.target.value })
              }
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              value={rowData.quantity}
              className={styles.input}
              type='text'
              placeholder={quantity?.toString()}
              onChange={(e): void =>
                setRowData({ ...rowData, quantity: Number(e.target.value) })
              }
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              value={rowData.unitPrice}
              className={styles.input}
              type='text'
              placeholder={unitPrice?.toString()}
              onChange={(e): void =>
                setRowData({ ...rowData, unitPrice: Number(e.target.value) })
              }
              onKeyDown={handleKeyPress}
            />
          </div>
          <div>{price}</div>
        </div>
      )}
      {isEditable && type === "level" && (
        <div className={styles.level}>
          <div style={calculateRows}>
            <img
              src={parent === null ? BlueFolder : GreenFolder}
              alt='folder'
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              value={rowData.title}
              className={styles.input}
              type='text'
              placeholder={title}
              onChange={(e): void =>
                setRowData({ ...rowData, title: e.target.value })
              }
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input className={styles.input} disabled />
          </div>
          <div className={styles.inputWrapper}>
            <input className={styles.input} disabled />
          </div>
          <div className={styles.inputWrapper}>
            <input className={styles.input} disabled />
          </div>
          <div>{price}</div>
        </div>
      )}
      {!isEditable && type === "row" && (
        <div className={styles.row} onClick={handleClick}>
          <div
            style={calculateRows}
            className={styles.addNewRow}
            onMouseOver={(): void => setShowIcon(true)}
            onMouseLeave={(): void => setShowIcon(false)}>
            <img
              src={Docs}
              alt='docs'
            />
            {showIcon && (
              <img
                src={Docs}
                alt='docs'
                onClick={():void => addNewRow(id, parent)}
              />
            )}
          </div>
          <div>{rowData.title}</div>
          <div>{rowData.unit}</div>
          <div>{rowData.quantity}</div>
          <div>{rowData.unitPrice}</div>
          <div>{price}</div>
        </div>
      )}
      {!isEditable && type === "level" && (
        <div className={styles.row} onClick={handleClick}>
          <div
            style={calculateRows}
            className={styles.addNewRow}
            onMouseOver={(): void => setShowIcon(true)}
            onMouseLeave={(): void => setShowIcon(false)}>
            {parent === null && (
              <img
                src={BlueFolder}
                alt='folder'
              />
            )}
            {parent !== null && (
              <img
                src={GreenFolder}
                alt='folder'
                onClick={():void => addNewLevel(id, parent)}
              />
            )}
            {showIcon && parent === null && <img src={GreenFolder} alt='folder' onClick={():void => addNewLevel(id, id)} />}
            {showIcon && parent !== null && <img src={Docs} alt='docs' onClick={():void => addNewRow(id, id)} />}
          </div>
          <div>{rowData.title}</div>
          <div>{rowData.unit}</div>
          <div>{rowData.quantity}</div>
          <div>{rowData.unitPrice}</div>
          <div>{price}</div>
        </div>
      )}
    </>
  );
};

export default Row;
