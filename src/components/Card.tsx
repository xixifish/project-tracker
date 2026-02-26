import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../types/types";

type CardProps = {
  task: Task;
  index: number;
  deleteTaskInColumn: (taskId: string) => void;
};

export default function Card({ task, index, deleteTaskInColumn }: CardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="flex-1 bg-white p-4 rounded-xl"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>{task.content}</div>
          <button onClick={() => deleteTaskInColumn(task.id)}>Delete</button>
        </div>
      )}
    </Draggable>
  );
}
