import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";

export const todoList = sqliteTable(
  "todo_list",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    isDefault: integer("is_default", { mode: "boolean" })
      .default(false)
      .notNull(),
    position: integer("position").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("todo_list_userId_idx").on(table.userId)]
);

export const todoTask = sqliteTable(
  "todo_task",
  {
    id: text("id").primaryKey(),
    listId: text("list_id")
      .notNull()
      .references(() => todoList.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    completed: integer("completed", { mode: "boolean" })
      .default(false)
      .notNull(),
    position: integer("position").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("todo_task_listId_idx").on(table.listId)]
);

export const todoListRelations = relations(todoList, ({ many, one }) => ({
  tasks: many(todoTask),
  user: one(user, {
    fields: [todoList.userId],
    references: [user.id],
  }),
}));

export const todoTaskRelations = relations(todoTask, ({ one }) => ({
  list: one(todoList, {
    fields: [todoTask.listId],
    references: [todoList.id],
  }),
}));
