import { InferSelectModel, relations } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const orderTable = pgTable("order", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull(),
  amount: numeric("amount", {mode: 'number'}).notNull(),
  status: varchar("status").default("Pending").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Order = InferSelectModel<typeof orderTable>;

export const orderdetailsTable = pgTable("orderdetails", {
  id: serial("id").primaryKey(),
  name: varchar("item_name").notNull(),
  quantity: integer("quantity").notNull(),
  price: numeric("amount", {mode: 'number'}).notNull(),
  orderId: integer("order_id")
    .references(() => orderTable.id, { onDelete: "cascade" })
    .notNull(),
  productId: integer("quantity").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type OrderDetails = InferSelectModel<typeof orderdetailsTable>;

export const orderRelations = relations(orderTable, ({ many }) => ({
  orderDetails: many(orderdetailsTable),
}));

export const orderDetailsRelations = relations(orderdetailsTable, ({ one }) => ({
  order: one(orderTable, {
    fields: [orderdetailsTable.orderId],
    references: [orderTable.id],
  }),
}));
