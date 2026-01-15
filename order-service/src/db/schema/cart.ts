import { InferSelectModel, relations } from "drizzle-orm";
import { integer, numeric, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const cartTable = pgTable("cart", {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  customerId: integer('customer_id').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('deleted_at').notNull().defaultNow(),
});

export const cartItemsTable = pgTable("cartitems", {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  productId: integer("product_id").notNull(),
  cartId: integer("cart_id")
    .references(() => cartTable.id, { onDelete: "cascade" })
    .notNull(),
  itemName: varchar("item_name").notNull(),
  quantity: integer("quantity").notNull(),
  price: numeric("amount").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const cartRelations = relations(cartTable, ({ many }) => ({
  cartItems: many(cartItemsTable),
}));

export const cartItemsRelations = relations(cartItemsTable, ({ one }) => ({
  cart: one(cartTable, {
    fields: [cartItemsTable.cartId],
    references: [cartTable.id],
  }),
}));

export type Cart = InferSelectModel<typeof cartTable>;
export type CartItem = InferSelectModel<typeof cartItemsTable>;


