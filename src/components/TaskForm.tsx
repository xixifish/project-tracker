import { useState } from "react";

type TaskFormProps = {
  initialContent?: string;
  initialDueDate?: string;
  onSubmit: (content: string, dueDate: string) => void;
  onCancel: () => void;
};

export default function TaskForm({
  initialContent = "",
  initialDueDate = "",
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [taskContent, setTaskContent] = useState(initialContent);
  const [taskDueDate, setDueDate] = useState(initialDueDate);

  return (
    <div className="flex-col bg-amber-300 mt-2 p-2">
      <input
        type="text"
        onChange={(e) => setTaskContent(e.target.value)}
        value={taskContent}
        className="bg-white w-full"
      />
      <input
        type="date"
        onChange={(e) => setDueDate(e.target.value)}
        value={taskDueDate}
        className="bg-white w-full"
      />
      <div className="flex">
        <button
          className="flex-1"
          onClick={() => {
            onSubmit(taskContent, taskDueDate);
          }}
        >
          Save
        </button>
        <button
          className="flex-1"
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
