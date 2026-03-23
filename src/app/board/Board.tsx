"use client";

import { Task, ColumnType, StateData } from "@/src/types/types";
import Column from "@/src/components/Column";
import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import {
  addTask as addTaskToDb,
  editTask as editTaskToDb,
  deleteTask as deleteTaskToDb,
  moveTask as moveTaskToDb,
} from "./actions";

export default function Board({ initialData }: { initialData: StateData }) {
  const [board, setBoard] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    // draggableId: the ID of the task being dragged
    // source.droppableId: the column ID the task came from
    // source.index: the position (0-based) the task was at in the source
    // destination.droppableId: the column ID the task is dropped into
    // destination.index: the position (0-based) where the task lands

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

    // Update database
    const dragToTask =
      board.tasks[
        board.columns[destination.droppableId].taskIds[destination.index]
      ];
    let newOrder = 0;
    if (dragToTask) {
      newOrder = dragToTask.order;
    } else {
      newOrder = board.columns[destination.droppableId].taskIds.length + 1;
    }
    moveTaskToDb(
      draggableId,
      source.droppableId,
      destination.droppableId,
      board.tasks[draggableId].order,
      newOrder,
    );
  };

  function addTask(
    taskContent: string,
    columnId: string,
    dueDate: Date | null,
  ) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      content: taskContent,
      order: board.columns[columnId].taskIds.length + 1,
      createdAt: new Date(),
      dueDate: dueDate,
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

    // Update database
    addTaskToDb(taskContent, columnId, dueDate);
  }

  function editTask(taskId: string, taskContent: string, dueDate: Date | null) {
    const updatedTask: Task = {
      ...board.tasks[taskId],
      content: taskContent,
      dueDate: dueDate,
    };

    const newTasks: Record<string, Task> = {
      ...board.tasks,
      [taskId]: updatedTask,
    };
    const newState = { ...board, tasks: newTasks };
    setBoard(newState);

    // Update database
    editTaskToDb(taskId, taskContent, dueDate);
  }

  function deleteTask(columnId: string, taskId: string) {
    // Remove the task from the taskIds of the column
    const newTaskIds = [...board.columns[columnId].taskIds];
    const delete_idx = newTaskIds.indexOf(taskId);
    newTaskIds.splice(delete_idx, 1);
    // Set new sub objects of the board state
    const newColumn = {
      ...board.columns[columnId],
      taskIds: newTaskIds,
    };

    const newColumns = {
      ...board.columns,
      [columnId]: newColumn,
    };

    const { [taskId]: _deletedTask, ...newTasks } = { ...board.tasks };

    const newState = { ...board, columns: newColumns, tasks: newTasks };
    setBoard(newState);

    // Update database
    deleteTaskToDb(taskId);
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
              editTask={editTask}
              deleteTask={deleteTask}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}
