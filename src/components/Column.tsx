import { Task, ColumnType } from "../types/types";
import Card from "./Card";
import { Droppable } from "@hello-pangea/dnd";
import { useState } from "react";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  addTask: (taskContent: string, columnId: string) => void;
};

export default function Column({ column, tasks, addTask }: ColumnProps) {
  const [taskContent, setTaskContent] = useState("");
  const [formIsOpen, setFormIsOpen] = useState(false);

  return (
    <div className="flex-1 bg-orange-100 p-2">
      <h1 className="text-2xl font-bold">{column.title}</h1>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <ul
            className="flex flex-col gap-2"
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
      <div>
        {formIsOpen ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTask(taskContent, column.id);
              setFormIsOpen(false);
              setTaskContent("");
            }}
            className="flex-col bg-amber-300 mt-2 p-2"
          >
            <input
              type="text"
              value={taskContent}
              onChange={(e) => setTaskContent(e.target.value)}
              className="bg-white w-full"
            />
            <div className="flex">
              <button type="submit" className="flex-1">
                Save
              </button>
              <button
                type="button"
                className="flex-1"
                onClick={() => setFormIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button onClick={() => setFormIsOpen(true)}>Add Task</button>
        )}
      </div>
    </div>
  );
}
