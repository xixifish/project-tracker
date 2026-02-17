import { Task, ColumnType } from "@/src/types/types";
import ColumnComponent from "@/src/components/Column";
import { state_data } from "@/src/data/initialData";

export default function Page() {
  return (
    <div className="flex gap-1 h-screen">
      {state_data.columnOrder.map((columnId) => {
        const column: ColumnType = state_data.columns[columnId];
        const tasks: Task[] = column.taskIds.map(
          (taskId) => state_data.tasks[taskId],
        );

        return (
          <ColumnComponent key={column.id} column={column} tasks={tasks} />
        );
      })}
    </div>
  );
}
