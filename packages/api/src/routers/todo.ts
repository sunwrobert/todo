import {
  countLists,
  countTasks,
  createList,
  createTask,
  deleteList,
  deleteTaskForUser,
  ensureDefaultList,
  getListById,
  getLists,
  getTaskForUser,
  getTasksForList,
  moveTaskForUser,
  updateList,
  updateTaskForUser,
} from "@todo/db/queries/todo";
import z from "zod";

import { protectedProcedure } from "../index";

const listNameSchema = z.string().min(1).max(255);
const taskContentSchema = z.string().min(1).max(4096);

const createListInput = z.object({
  name: listNameSchema,
});

const updateListInput = z
  .object({
    id: z.string().min(1),
    name: listNameSchema.optional(),
    position: z.number().int().min(1).optional(),
  })
  .refine((value) => value.name !== undefined || value.position !== undefined, {
    message: "No updates provided.",
  });

const createTaskInput = z.object({
  listId: z.string().min(1),
  content: taskContentSchema,
});

const updateTaskInput = z
  .object({
    id: z.string().min(1),
    content: taskContentSchema.optional(),
    completed: z.boolean().optional(),
    position: z.number().int().min(1).optional(),
  })
  .refine(
    (value) =>
      value.content !== undefined ||
      value.completed !== undefined ||
      value.position !== undefined,
    {
      message: "No updates provided.",
    }
  );

const moveTaskInput = z.object({
  id: z.string().min(1),
  targetListId: z.string().min(1),
});

export const todoRouter = {
  createList: protectedProcedure
    .input(createListInput)
    .handler(async ({ input, context, errors }) => {
      const userId = context.session.user.id;
      const listCount = await countLists({ userId });
      if (listCount >= 20) {
        throw errors.CONFLICT({
          message: "List limit reached (20).",
        });
      }
      return createList({ userId, name: input.name });
    }),

  getList: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .handler(async ({ input, context, errors }) => {
      const list = await getListById({
        userId: context.session.user.id,
        listId: input.id,
      });
      if (!list) {
        throw errors.NOT_FOUND({
          message: "List not found.",
        });
      }
      return list;
    }),

  getLists: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session.user.id;
    await ensureDefaultList({ userId });
    return getLists({ userId });
  }),

  updateList: protectedProcedure
    .input(updateListInput)
    .handler(async ({ input, context, errors }) => {
      const updated = await updateList({
        userId: context.session.user.id,
        listId: input.id,
        name: input.name,
        position: input.position,
      });
      if (!updated) {
        throw errors.NOT_FOUND({
          message: "List not found.",
        });
      }
      return updated;
    }),

  deleteList: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .handler(async ({ input, context, errors }) => {
      const list = await getListById({
        userId: context.session.user.id,
        listId: input.id,
      });
      if (!list) {
        throw errors.NOT_FOUND({
          message: "List not found.",
        });
      }
      if (list.isDefault) {
        throw errors.BAD_REQUEST({
          message: "Default list cannot be deleted.",
        });
      }

      await deleteList({ userId: context.session.user.id, listId: input.id });
    }),

  createTask: protectedProcedure
    .input(createTaskInput)
    .handler(async ({ input, context, errors }) => {
      const list = await getListById({
        userId: context.session.user.id,
        listId: input.listId,
      });
      if (!list) {
        throw errors.NOT_FOUND({
          message: "List not found.",
        });
      }
      const taskCount = await countTasks({ listId: input.listId });
      if (taskCount >= 500) {
        throw errors.CONFLICT({
          message: "Task limit reached (500).",
        });
      }
      return createTask({ listId: input.listId, content: input.content });
    }),

  getTask: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .handler(async ({ input, context, errors }) => {
      const task = await getTaskForUser({
        userId: context.session.user.id,
        taskId: input.id,
      });
      if (!task) {
        throw errors.NOT_FOUND({
          message: "Task not found.",
        });
      }

      return task;
    }),

  getTasks: protectedProcedure
    .input(z.object({ listId: z.string().min(1) }))
    .handler(async ({ input, context, errors }) => {
      const list = await getListById({
        userId: context.session.user.id,
        listId: input.listId,
      });
      if (!list) {
        throw errors.NOT_FOUND({
          message: "List not found.",
        });
      }
      return getTasksForList({ listId: input.listId });
    }),

  updateTask: protectedProcedure
    .input(updateTaskInput)
    .handler(async ({ input, context, errors }) => {
      const updated = await updateTaskForUser({
        userId: context.session.user.id,
        taskId: input.id,
        content: input.content,
        completed: input.completed,
        position: input.position,
      });
      if (!updated) {
        throw errors.NOT_FOUND({
          message: "Task not found.",
        });
      }
      return updated;
    }),

  deleteTask: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .handler(async ({ input, context, errors }) => {
      const deleted = await deleteTaskForUser({
        userId: context.session.user.id,
        taskId: input.id,
      });
      if (!deleted) {
        throw errors.NOT_FOUND({
          message: "Task not found.",
        });
      }
    }),

  moveTask: protectedProcedure
    .input(moveTaskInput)
    .handler(async ({ input, context, errors }) => {
      const userId = context.session.user.id;
      const targetList = await getListById({
        userId,
        listId: input.targetListId,
      });
      if (!targetList) {
        throw errors.NOT_FOUND({
          message: "Target list not found.",
        });
      }
      const updated = await moveTaskForUser({
        userId,
        taskId: input.id,
        targetListId: input.targetListId,
      });
      if (!updated) {
        throw errors.NOT_FOUND({
          message: "Task not found.",
        });
      }
      return updated;
    }),
};
