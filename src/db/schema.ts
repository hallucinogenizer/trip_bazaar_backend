import { boolean, date, integer, pgTable, timestamp, varchar, text, unique, pgTableCreator } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const primaryDestinationsTable = pgTable("primary_destinations", {
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
  start_location_id: integer("start_location_id").references(() => primaryDestinationsTable.id, { onDelete: "restrict" }),
  end_date: date("end_date"),
  end_date_time: timestamp("end_date_time"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
});

// Join table for tours and their primary destinations (many-to-many)
export const tourPrimaryDestinationsTable = pgTable(
  "tour_primary_destinations", 
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    tour_id: integer("tour_id").notNull().references(() => toursTable.id, { onDelete: "restrict" }),
    primary_destination_id: integer("primary_destination_id").notNull().references(() => primaryDestinationsTable.id, { onDelete: "restrict" }),
    created_at: timestamp("created_at").defaultNow()
  }
);

// Join table for tours and their secondary destinations (many-to-many)
export const tourSecondaryDestinationsTable = pgTable(
  "tour_secondary_destinations", 
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    tour_id: integer("tour_id").notNull().references(() => toursTable.id, { onDelete: "restrict" }),
    secondary_destination_id: integer("secondary_destination_id").notNull().references(() => primaryDestinationsTable.id, { onDelete: "restrict" }),
    created_at: timestamp("created_at").defaultNow()
  }
);

// Define relations between tables
export const primaryDestinationsRelations = relations(primaryDestinationsTable, ({ many }) => ({
  tours: many(toursTable, { relationName: "start_location_tours" }),
  tour_primary_destinations: many(tourPrimaryDestinationsTable, { relationName: "primary_destination_tours" }),
  tour_secondary_destinations: many(tourSecondaryDestinationsTable, { relationName: "secondary_destination_tours" })
}));

export const toursRelations = relations(toursTable, ({ one, many }) => ({
  start_location: one(primaryDestinationsTable, {
    fields: [toursTable.start_location_id],
    references: [primaryDestinationsTable.id],
    relationName: "start_location_tours"
  }),
  primary_destinations: many(tourPrimaryDestinationsTable, { relationName: "tour_primary_destinations" }),
  secondary_destinations: many(tourSecondaryDestinationsTable, { relationName: "tour_secondary_destinations" })
}));

export const tourPrimaryDestinationsRelations = relations(tourPrimaryDestinationsTable, ({ one }) => ({
  tour: one(toursTable, {
    fields: [tourPrimaryDestinationsTable.tour_id],
    references: [toursTable.id],
    relationName: "tour_primary_destinations"
  }),
  primary_destination: one(primaryDestinationsTable, {
    fields: [tourPrimaryDestinationsTable.primary_destination_id],
    references: [primaryDestinationsTable.id],
    relationName: "primary_destination_tours"
  })
}));

export const tourSecondaryDestinationsRelations = relations(tourSecondaryDestinationsTable, ({ one }) => ({
  tour: one(toursTable, {
    fields: [tourSecondaryDestinationsTable.tour_id],
    references: [toursTable.id],
    relationName: "tour_secondary_destinations"
  }),
  secondary_destination: one(primaryDestinationsTable, {
    fields: [tourSecondaryDestinationsTable.secondary_destination_id],
    references: [primaryDestinationsTable.id],
    relationName: "secondary_destination_tours"
  })
}));