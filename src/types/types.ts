export type Task = {
  id: string;
  content: string;
  order: number;
};

export type ColumnType = {
  id: string;
  title: string;
  taskIds: string[];
};

export type StateData = {
  tasks: Record<string, Task>;
  columns: Record<string, ColumnType>;
  columnOrder: string[];
};
