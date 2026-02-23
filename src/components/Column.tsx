import { Task, ColumnType } from "../types/types";
import Card from "./Card";
import { Droppable } from "@hello-pangea/dnd";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export default function Column({ column, tasks }: ColumnProps) {
  return (
    <div className="flex-1 bg-orange-100">
      <h1 className="text-2xl font-bold">{column.title}</h1>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <ul
            className="flex flex-col gap-2 p-2"
            ref={provided.innerRef}
            // style={{
            //   backgroundColor: snapshot.isDraggingOver ? "white" : "blue",
            // }}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <li key={task.id}>
                <Card key={task.id} task={task} index={index} />
              </li>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}
