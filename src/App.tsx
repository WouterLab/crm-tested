import { useEffect, useState } from "react";
import "./App.scss";
import Layout from "./common/Layout";
import Table from "./components/Table/Table";
import { NewRowData } from "./interfaces/interfaces";
import {
  countPrice,
  makeEmptyLevel,
  makeEmptyRow,
  recalculation,
  sortArray,
} from "./utils/functions";

function App(): JSX.Element {
  const initialData: NewRowData[] = [];
  const [dataRows, setDataRows] = useState(initialData);
  useEffect(() => {
    fetch("https://63267beaba4a9c475326fd42.mockapi.io/api/dbases/data")
      .then((res) => res.json())
      .then((json) => countPrice(json))
      .then((priced) => sortArray(priced))
      .then((data) => {
        const oldRow = data.filter((rows) => rows.price !== 0);
        const updated = recalculation(2222, data);
        updated.map((row) => oldRow.unshift(row));
        return oldRow;
      })
      .then((data) => setDataRows(data));
  }, []);

  const saveRow = (rowData: NewRowData): void => {
    const newArr = [...dataRows];
    const changeRowIndex = dataRows.findIndex((el) => el.id === rowData.id);
    newArr.splice(changeRowIndex, 1, rowData);
    const counted = countPrice(newArr);
    const oldRow = counted.filter((rows) => rows.price !== 0);
    const allLevels = dataRows.filter((el) => {
      const parent = el.parent?.toString();
      return parent?.startsWith("111");
    });
    const reversed = allLevels.reverse();
    reversed.map((el) => {
      const updated = recalculation(el.id, counted);
      updated.map((row) => oldRow.unshift(row));
      setDataRows(counted);
    });
  };

  const addNewLevel = (id: number, parent: number | null): void => {
    const newArr = [...dataRows];
    const newRow = makeEmptyLevel(id, parent);
    newArr.splice(dataRows.length, 0, newRow);
    setDataRows(newArr);
  };

  const addNewRow = (id: number, parent: number | null): void => {
    const newArr = [...dataRows];
    const checkId = dataRows.findIndex((el) => el.id === id);
    if (checkId === -1) {
      const newRow = makeEmptyRow(id, parent);
      newArr.splice(dataRows.length, 0, newRow);
      const sortedArr = sortArray(newArr);
      setDataRows(sortedArr);
    } else {
      const newRow = makeEmptyRow(id + 1, parent);
      newArr.splice(dataRows.length, 0, newRow);
      setDataRows(newArr);
    }
  };

  return (
    <div className='App'>
      <Layout>
        <Table
          data={dataRows}
          saveRow={saveRow}
          addNewLevel={addNewLevel}
          addNewRow={addNewRow}
        />
      </Layout>
    </div>
  );
}

export default App;
