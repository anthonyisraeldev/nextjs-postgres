import {
  text,
  boolean,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: varchar("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
