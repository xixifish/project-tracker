import { Task, ColumnType } from "../types/types";
import Card from "./Card";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export default function Column({ column, tasks }: ColumnProps) {
  return (
    <div className="flex-1 bg-orange-100">
      <h1 className="text-2xl font-bold">{column.title}</h1>
      <ul className="flex flex-col gap-2 p-2">
        {tasks.map((task) => (
          <li key={task.id}>
            <Card key={task.id} content={task.content} />
          </li>
        ))}
      </ul>
    </div>
  );
}
