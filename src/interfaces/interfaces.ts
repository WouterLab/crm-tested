export interface NewRowData {
  title: string; // Наименование работ
  unit?: string; // Ед. изм.
  quantity?: number; // Количество
  unitPrice?: number; // Цена за ед.
  price: number; // Стоимость
  parent: number | null; // id уровня, в котором находится (либо null для первого уровня)
  type: "row" | "level";
  id: number;
  childs?: NewRowData[];
  editing: boolean;
}
