import { useState, useEffect, useRef } from "react";
import { Check, X } from "lucide-react";

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

  // Set textarea active in default when it displays
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <form
      className="flex-col"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSubmit(taskContent, taskDueDate);
          e.preventDefault();
        }
      }}
    >
      <textarea
        onChange={(e) => setTaskContent(e.target.value)}
        value={taskContent}
        className="bg-white w-full h-20 border border-[#CBCBCB] rounded-lg pl-2 pr-2 pt-1"
        onKeyDown={(e) => {
          if (e.key === "Escape") onCancel();
        }}
        ref={textareaRef}
      />
      <div className="flex justify-between">
        <input
          type="date"
          onChange={(e) => setDueDate(e.target.value)}
          value={taskDueDate}
          className="bg-[#DADFF8] flex justify-start p-2 rounded-lg cursor-pointer"
          onKeyDown={(e) => {
            if (e.key === "Escape") onCancel();
          }}
        />
        <div className="flex justify-end">
          <button
            type="button"
            className={`flex items-center cursor-pointer
               bg-[#4A66F4] rounded-sm text-white text-center
               hover:bg-[#2447F6]
               pl-2.5 pr-2.5 mr-1`}
            onClick={() => {
              onSubmit(taskContent, taskDueDate);
            }}
          >
            <Check size={20} strokeWidth={2.5} />
          </button>
          <button
            className="flex items-center  hover:bg-[#DADFF8] rounded-sm text-[#333333] text-center pl-2.5 pr-2.5 cursor-pointer"
            onClick={() => {
              onCancel();
            }}
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </form>
  );
}
