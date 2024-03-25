// pages/api/tasks.js
"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getUserTasks = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const userTasks = await db.task.findMany({
      where: { userId: userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return userTasks || [];
  } catch (error) {
    console.log(error);
    return null;
  }
};
