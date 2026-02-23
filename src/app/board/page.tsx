"use client";

import { Task, ColumnType } from "@/src/types/types";
import Column from "@/src/components/Column";
import { state_data } from "@/src/data/initialData";
import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

export default function Page() {
  const [board, setBoard] = useState(state_data);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Guard if user puts the card back or drops it outside the columns
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    // Initialize taskIds
    const newTaskIdsSource = [...board.columns[source.droppableId].taskIds];
    // Delete the card from the source column at first
    newTaskIdsSource.splice(source.index, 1);

    // If the destination column stays same
    if (destination.droppableId === source.droppableId) {
      newTaskIdsSource.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...board.columns[source.droppableId],
        taskIds: newTaskIdsSource,
      };

      const newColumns = {
        ...board.columns,
        [source.droppableId]: newColumn,
      };

      const newState = { ...board, columns: newColumns };
      setBoard(newState);
    } else {
      // If the destination column is different
      // Initialize the destination column
      const newTaskIdsDestination = [
        ...board.columns[destination.droppableId].taskIds,
      ];
      // Add the card to the destination column
      newTaskIdsDestination.splice(destination.index, 0, draggableId);

      const newColumnSource = {
        ...board.columns[source.droppableId],
        taskIds: newTaskIdsSource,
      };

      const newColumnDestination = {
        ...board.columns[destination.droppableId],
        taskIds: newTaskIdsDestination,
      };

      const newColumns = {
        ...board.columns,
        [source.droppableId]: newColumnSource,
        [destination.droppableId]: newColumnDestination,
      };

      const newState = { ...board, columns: newColumns };
      setBoard(newState);
    }
  };

  function addTask(taskContent: string, columnId: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      content: taskContent,
    };
    const newTaskIds = [...board.columns[columnId].taskIds];
    newTaskIds.push(newTask.id);

    const newColumn = {
      ...board.columns[columnId],
      taskIds: newTaskIds,
    };

    const newColumns = {
      ...board.columns,
      [columnId]: newColumn,
    };

    const newTasks: Record<string, Task> = {
      ...board.tasks,
      [newTask.id]: newTask,
    };

    const newState = { ...board, columns: newColumns, tasks: newTasks };
    setBoard(newState);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-1 h-screen">
        {board.columnOrder.map((columnId) => {
          const column: ColumnType = board.columns[columnId];
          const tasks: Task[] = column.taskIds.map(
            (taskId) => board.tasks[taskId],
          );

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              addTask={addTask}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}
