import { NewRowData } from "../interfaces/interfaces";

export function recalculation(
  parentID: number | null,
  storage: NewRowData[],
): NewRowData[] {
  const rows = [...storage];
  const changedRows: NewRowData[] = [];
  if (parentID == null) return changedRows;
  let currentParentIndex = rows.findIndex((v) => v.id === parentID);
  if (currentParentIndex === -1) return changedRows;

  do {
    const currentParent = rows[currentParentIndex];
    const children = rows.filter((v) => v.parent == currentParent.id);
    const newPrice = children.reduce((acc, v) => acc + v.price, 0);

    if (currentParent.price === newPrice) break;
    rows[currentParentIndex].price = newPrice;
    changedRows.push(rows[currentParentIndex]);
    currentParentIndex = rows.findIndex((v) => v.id === currentParent.parent);
  } while (currentParentIndex !== -1);

  return changedRows;
}

export const countPrice = (arr: NewRowData[]): NewRowData[] => {
  const store: NewRowData[] = [];
  arr.map((row) => {
    const childsArr = arr.filter((v) => v.parent === row.id);
    store.push({
      ...row,
      childs: childsArr,
      price: row.quantity && row.unitPrice ? row.quantity * row.unitPrice : 0,
    });
  });
  return store;
};

export const sortArray = (arr: NewRowData[]): NewRowData[] => {
  const sorted: NewRowData[] = [];
  const topLevel = arr.filter((el) => el.parent === null);
  topLevel.map((el) => {
    sorted.push(el);
    const secondLevel = arr.filter((s) => s.parent === el.id);
    secondLevel.map((el) => {
      sorted.push(el);
      const thirdLevel = arr.filter((t) => t.parent === el.id);
      thirdLevel.map((el) => {
        sorted.push(el);
      });
    });
  });
  return sorted;
};

export const makeEmptyRow = (id: number, parent: number | null): NewRowData => {
  return {
    id: id + 1,
    title: "",
    unit: "",
    quantity: 0,
    unitPrice: 0,
    price: 0,
    parent: parent,
    type: "row",
    editing: true,
  };
};

export const makeEmptyLevel = (
  id: number,
  parent: number | null,
): NewRowData => {
  return {
    id: id + 1,
    title: "",
    unit: "",
    quantity: 0,
    unitPrice: 0,
    price: 0,
    parent,
    type: "level",
    editing: true,
  };
};
