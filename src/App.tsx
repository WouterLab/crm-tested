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
        const updated = recalculation(1, data);
        updated.map((row) => oldRow.unshift(row));
        return oldRow;
      })
      .then((data) => setDataRows(data));
  }, []);

  const saveRow = (rowData: NewRowData): void => {
    const newArr = [...dataRows];
    const currentData = dataRows.filter((el) => el.id === rowData.id);
    const popped = currentData.pop();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const rowIndex = dataRows.indexOf(popped!);
    newArr.splice(rowIndex, 1, rowData);
    const counted = countPrice(newArr);
    const sorted = sortArray(counted);
    const oldRow = sorted.filter((rows) => rows.price !== 0);
    const updated = recalculation(1, sorted);
    updated.map((row) => oldRow.unshift(row));
    setDataRows(sorted);
  };

  const handleLevelClick = (id: number, parent: number | null): void => {
    const newLevel = makeEmptyLevel(id, parent);
    const arrWithNewLevel = [...dataRows];
    arrWithNewLevel.push(newLevel);
    // const newLevel = makeEmptyLevel(id, parent);
    // const arrWithNewLevel = [...dataRows];
    // arrWithNewLevel.push(newLevel);
    // const sorted = sortArray(arrWithNewLevel);
    // console.log(sorted);

    // const oldRow = sorted.filter((rows) => rows.price !== 0);
    // const updated = recalculation(1, sorted);
    // updated.map((row) => oldRow.unshift(row));
    setDataRows(arrWithNewLevel);
  };

  const handleRowClick = (id: number, parent: number): void => {
    const newRow = makeEmptyRow(id, parent);
    const arrWithNewRow = [...dataRows];
    arrWithNewRow.push(newRow);
    const sorted = sortArray(arrWithNewRow);
    const oldRow = sorted.filter((rows) => rows.price !== 0);
    const updated = recalculation(1, sorted);
    updated.map((row) => oldRow.unshift(row));
    setDataRows(sorted);
  };

  const handleTopLevelClick = (id: number, parent: null): void => {
    const newRow = makeEmptyLevel(id, parent);
    const arrWithNewLevel = [...dataRows];
    arrWithNewLevel.push(newRow);
    setDataRows(arrWithNewLevel);
  };

  return (
    <div className='App'>
      <Layout>
        <Table
          data={dataRows}
          saveRow={saveRow}
          handleLevelClick={handleLevelClick}
          handleRowClick={handleRowClick}
          handleTopLevelClick={handleTopLevelClick}
        />
      </Layout>
    </div>
  );
}

export default App;
