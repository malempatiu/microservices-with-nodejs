import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";

export const cartTable = pgTable("cart", {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  customerId: integer('customer_id').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('deleted_at').notNull().defaultNow(),
});

export type Cart = InferSelectModel<typeof cartTable>;

