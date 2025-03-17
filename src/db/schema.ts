import { boolean, date, integer, pgTable, timestamp, varchar, text, unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * This was a demo table.
 * TODO: Remove.
 */
export const tasksTable = pgTable("tasks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: varchar({ length: 255 }).notNull(),
  completed: boolean().notNull().default(false),
});

export const locationsTable = pgTable("locations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  featured_image_url: varchar({ length: 255 }).notNull(),
  additional_image_urls: text("additional_image_urls").array(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
});

export const toursTable = pgTable("tours", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  price: integer().notNull(),
  featured_image_url: varchar({ length: 255 }).notNull(),
  additional_image_urls: text("additional_image_urls").array(),
  images: varchar({ length: 255 }).notNull(),
  start_date: date("start_date"),
  start_date_time: timestamp("start_date_time"),
  start_location_id: integer("start_location_id").references(() => locationsTable.id),
  end_date: date("end_date"),
  end_date_time: timestamp("end_date_time"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
});

// Define relations between tables
export const locationsRelations = relations(locationsTable, ({ many }) => ({
  tours: many(toursTable, { relationName: "location_tours" })
}));

export const toursRelations = relations(toursTable, ({ one }) => ({
  startLocation: one(locationsTable, {
    fields: [toursTable.start_location_id],
    references: [locationsTable.id],
    relationName: "location_tours"
  }),
}));