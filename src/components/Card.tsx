import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../types/types";
import { useState } from "react";
import { Trash2, AlarmClock } from "lucide-react";
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
          className={`relative
            items-center
            p-3 rounded-lg group shadow-sm hover:shadow-none
            ${!isEditing ? "hover:bg-[#E7EAF9] bg-white" : "bg-[#E7EAF9]"}`}
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
            <div className="flex-col">
              <div>{task.content}</div>
              {task.dueDate ? (
                <div className="inline-flex items-center rounded-sm  bg-[#F0F0F0] w-auto p-1 mt-2">
                  <AlarmClock size={16} />
                  <div className="text-sm ml-1">
                    {task.dueDate?.toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                </div>
              ) : null}
            </div>
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
              <Trash2 size={16} className="cursor-pointer hover:text-red-700" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
