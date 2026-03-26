import { Task, ColumnType } from "../types/types";
import Card from "./Card";
import { Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import TaskForm from "./TaskForm";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  addTask: (
    taskContent: string,
    columnId: string,
    taskDueDate: Date | null,
  ) => void;
  deleteTask: (columnId: string, taskId: string) => void;
  editTask: (
    taskId: string,
    taskContent: string,
    taskDueDate: Date | null,
  ) => void;
};

export default function Column({
  column,
  tasks,
  addTask,
  editTask,
  deleteTask,
}: ColumnProps) {
  // When the taskDueDate is empty, new Date("") can generate correct type
  const [formIsOpen, setFormIsOpen] = useState(false);

  function deleteTaskInColumn(taskId: string) {
    deleteTask(column.id, taskId);
  }

  return (
    <div className=" bg-orange-100 pt-4 p-2 w-80 rounded-lg">
      <h1 className="text-center text-xl font-bold mb-3">{column.title}</h1>
      <Droppable droppableId={column.id}>
        {(provided, _snapshot) => (
          <ul
            className="flex flex-col gap-2 min-h-8"
            ref={provided.innerRef}
            // style={{
            //   backgroundColor: snapshot.isDraggingOver ? "white" : "blue",
            // }}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <li key={task.id}>
                <Card
                  key={task.id}
                  task={task}
                  index={index}
                  editTask={editTask}
                  deleteTaskInColumn={deleteTaskInColumn}
                />
              </li>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <div>
        {formIsOpen ? (
          <TaskForm
            initialContent=""
            initialDueDate=""
            onSubmit={(taskContent, taskDueDate) => {
              addTask(
                taskContent,
                column.id,
                taskDueDate ? new Date(taskDueDate) : null,
              );
              setFormIsOpen(false);
            }}
            onCancel={() => {
              setFormIsOpen(false);
            }}
          />
        ) : (
          <button onClick={() => setFormIsOpen(true)}>Add Task</button>
        )}
      </div>
    </div>
  );
}
