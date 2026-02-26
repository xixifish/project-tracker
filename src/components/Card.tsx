import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../types/types";
import { useState } from "react";

type CardProps = {
  task: Task;
  index: number;
  editTask: (taskId: string, taskContent: string) => void;
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

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, _snapshot) => (
        <div
          className="relative items-center bg-white p-4 rounded-xl group"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <div>
              <input
                type="text"
                onChange={(e) => setTaskContent(e.target.value)}
                value={taskContent}
              />
              <div>
                <button
                  onClick={() => {
                    editTask(task.id, taskContent);
                    setIsEditing(false);
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setTaskContent(task.content);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex">{task.content}</div>
          )}
          <div className="absolute top-0.5 right-1 hidden group-hover:flex">
            <button
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Edit
            </button>
            <button onClick={() => deleteTaskInColumn(task.id)}>Delete</button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
