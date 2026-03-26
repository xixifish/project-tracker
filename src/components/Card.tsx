import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../types/types";
import { useState } from "react";
import { X } from "lucide-react";
import TaskForm from "./TaskForm";

type CardProps = {
  task: Task;
  index: number;
  editTask: (taskId: string, taskContent: string, dueDate: Date | null) => void;
  deleteTaskInColumn: (taskId: string) => void;
};

export default function Card({
  task,
  index,
  editTask,
  deleteTaskInColumn,
}: CardProps) {
  // Card has two states
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, _snapshot) => (
        <div
          className={`relative items-center bg-white p-4 rounded-lg group shadow-xs ${!isEditing ? "hover:bg-gray-100" : ""}`}
          onClick={() => {
            if (!isEditing) setIsEditing(true);
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            cursor: isEditing ? "default" : "pointer",
          }}
        >
          {isEditing ? (
            <TaskForm
              initialContent={task.content}
              initialDueDate={task.dueDate?.toISOString().split("T")[0]}
              onSubmit={(taskContent, taskDueDate) => {
                editTask(
                  task.id,
                  taskContent,
                  taskDueDate ? new Date(taskDueDate) : null,
                );
                setIsEditing(false);
              }}
              onCancel={() => {
                setIsEditing(false);
              }}
            />
          ) : (
            <div className="flex">{task.content}</div>
          )}
          <div
            className={`absolute top-2 right-2 hidden ${!isEditing ? "group-hover:flex" : ""}`}
          >
            <button
              onClick={(e) => {
                deleteTaskInColumn(task.id);
                e.stopPropagation();
              }}
            >
              <X size={16} className="cursor-pointer" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
