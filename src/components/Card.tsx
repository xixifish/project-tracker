import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../types/types";
import { useState } from "react";
import { X } from "lucide-react";

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
  // Task Content
  const [taskContent, setTaskContent] = useState(task.content);
  const [taskDueDate, setTaskDueDate] = useState(
    task.dueDate ? task.dueDate.toISOString().split("T")[0] : "",
  );

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
            <div className="flex-col bg-amber-300 mt-2 p-2">
              <input
                type="text"
                onChange={(e) => setTaskContent(e.target.value)}
                value={taskContent}
                className="bg-white w-full"
              />
              <input
                type="date"
                onChange={(e) => setTaskDueDate(e.target.value)}
                value={taskDueDate}
                className="bg-white w-full"
              />
              <div className="flex">
                <button
                  className="flex-1"
                  onClick={() => {
                    editTask(
                      task.id,
                      taskContent,
                      taskDueDate ? new Date(taskDueDate) : null,
                    );
                    setIsEditing(false);
                  }}
                >
                  Save
                </button>
                <button
                  className="flex-1"
                  onClick={() => {
                    setIsEditing(false);
                    setTaskContent(task.content);
                    setTaskDueDate(
                      task.dueDate
                        ? task.dueDate.toISOString().split("T")[0]
                        : "",
                    );
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex">{task.content}</div>
          )}
          <div
            className={`absolute top-0.5 right-1 hidden ${!isEditing ? "group-hover:flex" : ""}`}
          >
            {/*<button
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Edit
            </button>*/}
            <button
              onClick={(e) => {
                deleteTaskInColumn(task.id);
                e.stopPropagation();
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
