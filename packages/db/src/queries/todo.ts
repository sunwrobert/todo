import { and, desc, eq, sql } from "drizzle-orm";
import z from "zod";

import { db } from "../index";
import { todoList, todoTask } from "../schema";

export type TodoListRow = typeof todoList.$inferSelect;
export type TodoTaskRow = typeof todoTask.$inferSelect;

const defaultListName = "My Tasks";

export const userIdSchema = z.string().min(1);
export const listIdSchema = z.string().min(1);
export const taskIdSchema = z.string().min(1);
export const listNameSchema = z.string().min(1).max(255);
export const taskContentSchema = z.string().min(1).max(4096);
export const positionSchema = z.number().int().min(1);

export const countListsSchema = z.object({
  userId: userIdSchema,
});
export type CountListsSchema = z.infer<typeof countListsSchema>;

export const countTasksSchema = z.object({
  listId: listIdSchema,
});
export type CountTasksSchema = z.infer<typeof countTasksSchema>;

export const getNextListPositionSchema = z.object({
  userId: userIdSchema,
});
export type GetNextListPositionSchema = z.infer<
  typeof getNextListPositionSchema
>;

export const getNextTaskPositionSchema = z.object({
  listId: listIdSchema,
});
export type GetNextTaskPositionSchema = z.infer<
  typeof getNextTaskPositionSchema
>;

export const getListByIdSchema = z.object({
  userId: userIdSchema,
  listId: listIdSchema,
});
export type GetListByIdSchema = z.infer<typeof getListByIdSchema>;

export const getDefaultListSchema = z.object({
  userId: userIdSchema,
});
export type GetDefaultListSchema = z.infer<typeof getDefaultListSchema>;

export const ensureDefaultListSchema = z.object({
  userId: userIdSchema,
});
export type EnsureDefaultListSchema = z.infer<typeof ensureDefaultListSchema>;

export const getListsSchema = z.object({
  userId: userIdSchema,
});
export type GetListsSchema = z.infer<typeof getListsSchema>;

export const createListSchema = z.object({
  userId: userIdSchema,
  name: listNameSchema,
});
export type CreateListSchema = z.infer<typeof createListSchema>;

export const updateListSchema = z.object({
  userId: userIdSchema,
  listId: listIdSchema,
  name: listNameSchema.optional(),
  position: positionSchema.optional(),
});
export type UpdateListSchema = z.infer<typeof updateListSchema>;

export const deleteListSchema = z.object({
  userId: userIdSchema,
  listId: listIdSchema,
});
export type DeleteListSchema = z.infer<typeof deleteListSchema>;

export const getTasksForListSchema = z.object({
  listId: listIdSchema,
});
export type GetTasksForListSchema = z.infer<typeof getTasksForListSchema>;

export const getTaskForUserSchema = z.object({
  userId: userIdSchema,
  taskId: taskIdSchema,
});
export type GetTaskForUserSchema = z.infer<typeof getTaskForUserSchema>;

export const createTaskSchema = z.object({
  listId: listIdSchema,
  content: taskContentSchema,
});
export type CreateTaskSchema = z.infer<typeof createTaskSchema>;

export const updateTaskForUserSchema = z.object({
  userId: userIdSchema,
  taskId: taskIdSchema,
  content: taskContentSchema.optional(),
  completed: z.boolean().optional(),
  position: positionSchema.optional(),
});
export type UpdateTaskForUserSchema = z.infer<typeof updateTaskForUserSchema>;

export const deleteTaskForUserSchema = z.object({
  userId: userIdSchema,
  taskId: taskIdSchema,
});
export type DeleteTaskForUserSchema = z.infer<typeof deleteTaskForUserSchema>;

export const moveTaskForUserSchema = z.object({
  userId: userIdSchema,
  taskId: taskIdSchema,
  targetListId: listIdSchema,
});
export type MoveTaskForUserSchema = z.infer<typeof moveTaskForUserSchema>;

export async function countLists(data: CountListsSchema) {
  const [result] = await db
    .select({ count: sql<number>`count(*)` })
    .from(todoList)
    .where(eq(todoList.userId, data.userId));

  return result?.count ?? 0;
}

export async function countTasks(data: CountTasksSchema) {
  const [result] = await db
    .select({ count: sql<number>`count(*)` })
    .from(todoTask)
    .where(eq(todoTask.listId, data.listId));

  return result?.count ?? 0;
}

export async function getNextListPosition(data: GetNextListPositionSchema) {
  const [lastList] = await db
    .select({ position: todoList.position })
    .from(todoList)
    .where(eq(todoList.userId, data.userId))
    .orderBy(desc(todoList.position))
    .limit(1);

  return (lastList?.position ?? 0) + 1;
}

export async function getNextTaskPosition(data: GetNextTaskPositionSchema) {
  const [lastTask] = await db
    .select({ position: todoTask.position })
    .from(todoTask)
    .where(eq(todoTask.listId, data.listId))
    .orderBy(desc(todoTask.position))
    .limit(1);

  return (lastTask?.position ?? 0) + 1;
}

export async function getListById(data: GetListByIdSchema) {
  const [list] = await db
    .select()
    .from(todoList)
    .where(and(eq(todoList.id, data.listId), eq(todoList.userId, data.userId)))
    .limit(1);

  return list ?? null;
}

export async function getDefaultList(data: GetDefaultListSchema) {
  const [list] = await db
    .select()
    .from(todoList)
    .where(and(eq(todoList.userId, data.userId), eq(todoList.isDefault, true)))
    .limit(1);

  return list ?? null;
}

export async function ensureDefaultList(data: EnsureDefaultListSchema) {
  const existing = await getDefaultList({ userId: data.userId });
  if (existing) {
    return existing;
  }

  const [created] = await db
    .insert(todoList)
    .values({
      id: crypto.randomUUID(),
      userId: data.userId,
      name: defaultListName,
      isDefault: true,
      position: await getNextListPosition({ userId: data.userId }),
    })
    .returning();

  return created;
}

export async function getLists(data: GetListsSchema) {
  return db
    .select()
    .from(todoList)
    .where(eq(todoList.userId, data.userId))
    .orderBy(todoList.position);
}

export async function createList(data: CreateListSchema) {
  const [created] = await db
    .insert(todoList)
    .values({
      id: crypto.randomUUID(),
      userId: data.userId,
      name: data.name,
      isDefault: false,
      position: await getNextListPosition({ userId: data.userId }),
    })
    .returning();

  return created;
}

export async function updateList(data: UpdateListSchema) {
  const existing = await getListById({
    userId: data.userId,
    listId: data.listId,
  });
  if (!existing) {
    return null;
  }

  const [updated] = await db
    .update(todoList)
    .set({
      name: data.name ?? existing.name,
      position: data.position ?? existing.position,
    })
    .where(and(eq(todoList.id, data.listId), eq(todoList.userId, data.userId)))
    .returning();

  return updated ?? null;
}

export async function deleteList(data: DeleteListSchema) {
  await db
    .delete(todoList)
    .where(and(eq(todoList.id, data.listId), eq(todoList.userId, data.userId)));
}

export async function getTasksForList(data: GetTasksForListSchema) {
  return db
    .select()
    .from(todoTask)
    .where(eq(todoTask.listId, data.listId))
    .orderBy(todoTask.position);
}

export async function getTaskForUser(data: GetTaskForUserSchema) {
  const [task] = await db
    .select({
      id: todoTask.id,
      listId: todoTask.listId,
      content: todoTask.content,
      completed: todoTask.completed,
      position: todoTask.position,
      createdAt: todoTask.createdAt,
      updatedAt: todoTask.updatedAt,
    })
    .from(todoTask)
    .innerJoin(todoList, eq(todoTask.listId, todoList.id))
    .where(and(eq(todoTask.id, data.taskId), eq(todoList.userId, data.userId)))
    .limit(1);

  return task ?? null;
}

export async function createTask(data: CreateTaskSchema) {
  const [created] = await db
    .insert(todoTask)
    .values({
      id: crypto.randomUUID(),
      listId: data.listId,
      content: data.content,
      completed: false,
      position: await getNextTaskPosition({ listId: data.listId }),
    })
    .returning();

  return created;
}

export async function updateTaskForUser(data: UpdateTaskForUserSchema) {
  const existing = await getTaskForUser({
    userId: data.userId,
    taskId: data.taskId,
  });
  if (!existing) {
    return null;
  }

  const [updated] = await db
    .update(todoTask)
    .set({
      content: data.content ?? existing.content,
      completed: data.completed ?? existing.completed,
      position: data.position ?? existing.position,
    })
    .where(eq(todoTask.id, data.taskId))
    .returning();

  return updated ?? null;
}

export async function deleteTaskForUser(data: DeleteTaskForUserSchema) {
  const existing = await getTaskForUser({
    userId: data.userId,
    taskId: data.taskId,
  });
  if (!existing) {
    return null;
  }

  await db.delete(todoTask).where(eq(todoTask.id, data.taskId));
  return existing;
}

export async function moveTaskForUser(data: MoveTaskForUserSchema) {
  const existing = await getTaskForUser({
    userId: data.userId,
    taskId: data.taskId,
  });
  if (!existing) {
    return null;
  }

  const [updated] = await db
    .update(todoTask)
    .set({
      listId: data.targetListId,
      position: await getNextTaskPosition({ listId: data.targetListId }),
    })
    .where(eq(todoTask.id, data.taskId))
    .returning();

  return updated ?? null;
}
