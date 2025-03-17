import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const tasksTable = pgTable("tasks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: varchar({ length: 255 }).notNull(),
  completed: boolean().notNull().default(false),
});