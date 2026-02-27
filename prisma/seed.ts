import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const columnTodo = await prisma.column.create({
    data: {
      title: "TO DO",
      order: 1,
      tasks: {
        create: [
          { content: "Take out the garbage", order: 1 },
          { content: "Watch my favorite show - Pitts", order: 2 },
          { content: "Order books for Gemma", order: 3 },
        ],
      },
    },
    include: {
      tasks: true,
    },
  });
  const columnDoing = await prisma.column.create({
    data: {
      title: "DOING",
      order: 2,
      tasks: {
        create: [
          {
            content: "Do groceries: tomatoes, potatoes, apples, bananas",
            order: 1,
          },
          { content: "Prepare tomorrow's lunchbox", order: 2 },
          { content: "Make iced tea", order: 3 },
        ],
      },
    },
    include: {
      tasks: true,
    },
  });
  const columnDone = await prisma.column.create({
    data: {
      title: "DONE",
      order: 3,
      tasks: {
        create: [
          { content: "Do laundry", order: 1 },
          { content: "Make yoghurt", order: 2 },
        ],
      },
    },
    include: {
      tasks: true,
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
