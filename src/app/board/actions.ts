"use server";
import prisma from "@/src/lib/prisma";

export async function addTask(taskContent: string, columnId: string) {
  const taskNum = await prisma.task.count({ where: { columnId } });

  await prisma.task.create({
    data: {
      content: taskContent,
      order: taskNum + 1,
      columnId: columnId,
    },
  });
}

export async function deleteTask(taskId: string) {
  await prisma.task.delete({ where: { id: taskId } });
}

export async function editTask(taskId: string, taskContent: string) {
  await prisma.task.update({
    where: { id: taskId },
    data: { content: taskContent },
  });
}

export async function moveTask(
  taskId: string,
  fromColumnId: string,
  toColumnId: string,
  oldOrder: number,
  newOrder: number,
) {
  if (fromColumnId === toColumnId) {
    if (oldOrder < newOrder) {
      await prisma.task.updateMany({
        where: {
          columnId: fromColumnId,
          order: {
            gt: oldOrder,
            lte: newOrder,
          },
        },
        data: {
          order: { increment: -1 },
        },
      });
    } else {
      await prisma.task.updateMany({
        where: {
          columnId: fromColumnId,
          order: {
            lt: oldOrder,
            gte: newOrder,
          },
        },
        data: {
          order: { increment: +1 },
        },
      });
    }
    // Update the order of the moving task at the end
    // then its order won't be changed after the change
    // event below
    await prisma.task.update({
      where: { id: taskId },
      data: { order: newOrder },
    });
  } else {
    // The task is moved to another column
    // Handle the fromColumn
    await prisma.task.updateMany({
      where: {
        columnId: fromColumnId,
        order: { gt: oldOrder },
      },
      data: { order: { increment: -1 } },
    });
    // Handle the toColumn
    await prisma.task.updateMany({
      where: {
        columnId: toColumnId,
        order: { gte: newOrder },
      },
      data: { order: { increment: +1 } },
    });
    // Set the order of the moving card
    await prisma.task.update({
      where: { id: taskId },
      data: { order: newOrder, columnId: toColumnId },
    });
  }
}
