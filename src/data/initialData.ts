import { StateData } from "../types/types";

export const state_data: StateData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Change my phone" },
    "task-4": { id: "task-4", content: "Cook dinner" },
    "task-5": { id: "task-5", content: "Do laundry" },
    "task-6": { id: "task-6", content: "Prepare tomorrow's lunchbox" },
    "task-7": { id: "task-7", content: "Make tea" },
    "task-8": { id: "task-8", content: "Make yoghurt" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: ["task-5", "task-6"],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task-7", "task-8"],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};
