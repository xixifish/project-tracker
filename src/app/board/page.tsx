import BoardWrapper from "@/src/components/BoardWrapper";
import prisma from "@/src/lib/prisma";
import { Task, ColumnType } from "@/src/types/types";

export default async function Page() {
  const columns = await prisma.column.findMany({
    include: { tasks: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });
  const columnsRecord = columns.reduce<Record<string, ColumnType>>(
    (acc, column) => {
      acc[column.id] = {
        id: column.id,
        title: column.title,
        taskIds: column.tasks.map((task) => task.id),
      };
      return acc;
    },
    {},
  );
  const tasksRecord = columns.reduce<Record<string, Task>>((acc, column) => {
    column.tasks.forEach((task) => {
      acc[task.id] = {
        id: task.id,
        content: task.content,
        order: task.order,
      };
    });
    return acc;
  }, {});
  const columnOrders = columns.map((column) => {
    return column.id;
  });

  const stateData = {
    tasks: tasksRecord,
    columns: columnsRecord,
    columnOrder: columnOrders,
  };

  return <BoardWrapper initialData={stateData} />;
}
