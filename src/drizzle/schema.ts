import { pgTable, serial, text, decimal, varchar,integer,pgEnum, primaryKey, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations,sql} from "drizzle-orm";
import { Table } from 'drizzle-orm';
import { date } from "drizzle-orm/mysql-core";


// Define Users table
export const UsersTable = pgTable("users", {
  user_id: serial("user_id").notNull().primaryKey(),
  full_name: varchar("full_name").notNull(),
  email: varchar("email").notNull(),
  contact_phone: integer("contact_phone").notNull(),
  email_verified: boolean("email_verified"),
  address: varchar("address").notNull(),
});

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const AuthorizeUsersTable = pgTable("authorizeusers", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => UsersTable.user_id, { onDelete: "cascade" }),
  password: varchar("password").notNull(),
  username: varchar("username").notNull(),
  role: roleEnum("role").default("user"),
  verificationToken: varchar("verificationToken"),
  verified: boolean("verified").default(false)
});

export const VehicleSpecificationTable = pgTable("vehicle_specification", {
  vehicleSpec_id: serial("vehicleSpec_id").primaryKey(),
  manufacturer: varchar("manufacturer").notNull(),
  model: varchar("model").notNull(),
  year: integer("year").notNull(),
  engine_capacity: decimal("engine_capacity").notNull(),
  fuel_type: varchar("fuel_type").notNull(),
  seating_capacity: integer("seating_capacity").notNull(),
  color: varchar("color").notNull(),
  transmission: varchar("transmission").notNull(),
  features: varchar("features").notNull(),
  image: varchar("image"),
});

export const VehicleTable = pgTable("vehicle", {
  vehicle_id: serial("vehicle_id").primaryKey(),
  vehicle_specification_id: integer("vehicle_specification_id").notNull().references(() => VehicleSpecificationTable.vehicleSpec_id, { onDelete: "cascade" }),
  rental_rate: decimal("rental_rate").notNull(),
  rented_out: boolean("rented_out").default(false),
});

export const BookingTable = pgTable("booking", {
  booking_id: serial("booking_id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => UsersTable.user_id, { onDelete: "cascade" }),
  vehicle_id: integer("vehicle_id").notNull().references(() => VehicleTable.vehicle_id, { onDelete: "cascade" }),
  location_id: integer("location_id").notNull().references(() => LocationBranchesTable.location_id, { onDelete: "cascade" }),
  booking_date: timestamp("start_date").default(sql`NOW()`).notNull(),
  return_date: timestamp("end_date").default(sql`NOW()`).notNull(),
  total_cost: decimal("total_cost").notNull(),
  status: varchar("status").notNull(),
  payment_id: varchar("payment_id").notNull(),
});

export const PaymentTable = pgTable("payment", {
  payment_id: serial("payment_id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => UsersTable.user_id, { onDelete: "cascade" }),
  booking_id: integer("booking_id").notNull().references(() => BookingTable.booking_id, { onDelete: "cascade" }),
  payment_date: timestamp("payment_date").default(sql`NOW()`).notNull(),
  payment_amount: decimal("payment_amount").notNull(),
  payment_method: varchar("payment_method").notNull(),
  payment_status: varchar("payment_status").notNull(),
  transaction_id: varchar("transaction_id"),
});

export const CustomerSupportTicketsTable = pgTable("customer_support_tickets", {
  ticket_id: serial("ticket_id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => UsersTable.user_id, { onDelete: "cascade" }),
  subject: varchar("subject").notNull(),
  description: text("description").notNull(),
  status: varchar("status").default("open"),
});

export const LocationBranchesTable = pgTable("location_branches", {
  location_id: serial("location_id").primaryKey(),
  location_name: varchar("location_name").notNull(),
  address: varchar("address").notNull(),
  contact_phone: integer("contact_phone").notNull(),
  email: varchar("email").notNull(),
});

export const FleetManagementTable = pgTable("fleet_management", {
  fleet_id: serial("fleet_id").primaryKey(),
  vehicle_id: integer("vehicle_id").notNull().references(() => VehicleTable.vehicle_id, { onDelete: "cascade" }),
  vehicle_status: varchar("vehicle_status").default("available"),
  current_value: decimal("current_value").notNull(),
  maintenance_status: varchar("maintenance_status").default("good"),
  insurance_status: varchar("insurance_status").default("good"),
});

export const MaintainanceRecordTable = pgTable("maintainance_record", {
  maintenance_id: serial("maintenance_id").primaryKey(),
  vehicle_id: integer("vehicle_id").notNull().references(() => VehicleTable.vehicle_id, { onDelete: "cascade" }),
  maintenance_date: timestamp("maintenance_date").default(sql`NOW()`).notNull(),
  maintenance_description: text("maintenance_description").notNull(),
  maintenance_cost: decimal("maintenance_cost").notNull(),
});

export const ReviewsRatingTable = pgTable("reviews_rating", {
  review_id: serial("review_id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => UsersTable.user_id, { onDelete: "cascade" }),
  rating: integer("rating").default(5),
  review_date: timestamp("review_date").default(sql`NOW()`),
  comment: text("comment"),
  vehicle_id: integer("vehicle_id").notNull().references(() => VehicleTable.vehicle_id, { onDelete: "cascade" }),
});

export const PromotionalOffersTable = pgTable("promotional_offers", {
  offer_id: serial("offer_id").primaryKey(),
  offer_name: varchar("offer_name").notNull(),
  description: text("description").notNull(),
  start_date: timestamp("start_date").default(sql`NOW()`),
  end_date: timestamp("end_date").default(sql`NOW()`),
  discount_percentage: integer("discount_percentage").default(0),
  status: varchar("status").default("active"),
  vehicle_id: integer("vehicle_id").references(() => VehicleTable.vehicle_id, { onDelete: "cascade" }),
  location_id: integer("location_id").references(() => LocationBranchesTable.location_id, { onDelete: "cascade" }),
});

export const BookingOfferTable = pgTable("booking_offer", {
  booking_offer_id: serial("booking_offer_id").primaryKey(),
  booking_id: integer("booking_id").notNull().references(() => BookingTable.booking_id, { onDelete: "cascade" }),
  offer_id: integer("offer_id").references(() => PromotionalOffersTable.offer_id, { onDelete: "cascade" }),
});

// relationships
export const userRelations = relations(UsersTable, ({ one, many }) => ({
  authorizeUser: one(AuthorizeUsersTable, {
      fields: [UsersTable.user_id],
      references: [AuthorizeUsersTable.user_id],
  }),
  bookings: many(BookingTable),
  payments: many(PaymentTable),
  customerSupportTickets: many(CustomerSupportTicketsTable),
  reviewsRatings: many(ReviewsRatingTable),
}));

export const authorizeUserRelations = relations(AuthorizeUsersTable, ({ one }) => ({
  user: one(UsersTable, {
      fields: [AuthorizeUsersTable.user_id],
      references: [UsersTable.user_id],
  }),
}));

export const locationBranchesRelations = relations(LocationBranchesTable, ({ many }) => ({
  bookings: many(BookingTable),
  promotionalOffers: many(PromotionalOffersTable),
}));

export const vehicleSpecificationRelations = relations(VehicleSpecificationTable, ({ many }) => ({
  vehicles: many(VehicleTable),
}));

export const vehicleRelations = relations(VehicleTable, ({ one, many }) => ({
  vehicleSpecification: one(VehicleSpecificationTable, {
      fields: [VehicleTable.vehicle_specification_id],
      references: [VehicleSpecificationTable.vehicleSpec_id],
  }),
  fleetManagement: one(FleetManagementTable, {
      fields: [VehicleTable.vehicle_id],
      references: [FleetManagementTable.vehicle_id],
  }),
  bookings: many(BookingTable),
  maintenanceRecords: many(MaintainanceRecordTable),
  reviewsRatings: many(ReviewsRatingTable),
  promotionalOffers: many(PromotionalOffersTable),
}));

export const fleetManagementRelations = relations(FleetManagementTable, ({ one }) => ({
  vehicle: one(VehicleTable, {
      fields: [FleetManagementTable.vehicle_id],
      references: [VehicleTable.vehicle_id],
  }),
}));

export const bookingRelations = relations(BookingTable, ({ one, many }) => ({
  user: one(UsersTable, {
      fields: [BookingTable.user_id],
      references: [UsersTable.user_id],
  }),
  vehicle: one(VehicleTable, {
      fields: [BookingTable.vehicle_id],
      references: [VehicleTable.vehicle_id],
  }),
  location: one(LocationBranchesTable, {
      fields: [BookingTable.location_id],
      references: [LocationBranchesTable.location_id],
  }),
  payment: one(PaymentTable, {
      fields: [BookingTable.booking_id],
      references: [PaymentTable.booking_id],
  }),
  bookingOffers: many(BookingOfferTable),
}));

export const paymentRelations = relations(PaymentTable, ({ one }) => ({
  user: one(UsersTable, {
      fields: [PaymentTable.user_id],
      references: [UsersTable.user_id],
  }),
  booking: one(BookingTable, {
      fields: [PaymentTable.booking_id],
      references: [BookingTable.booking_id],
  }),
}));

export const customerSupportTicketsRelations = relations(CustomerSupportTicketsTable, ({ one }) => ({
  user: one(UsersTable, {
      fields: [CustomerSupportTicketsTable.user_id],
      references: [UsersTable.user_id],
  }),
}));

export const maintainanceRecordRelations = relations(MaintainanceRecordTable, ({ one }) => ({
  vehicle: one(VehicleTable, {
      fields: [MaintainanceRecordTable.vehicle_id],
      references: [VehicleTable.vehicle_id],
  }),
}));

export const reviewsRatingRelations = relations(ReviewsRatingTable, ({ one }) => ({
  user: one(UsersTable, {
      fields: [ReviewsRatingTable.user_id],
      references: [UsersTable.user_id],
  }),
  vehicle: one(VehicleTable, {
      fields: [ReviewsRatingTable.vehicle_id],
      references: [VehicleTable.vehicle_id],
  }),
}));

export const promotionalOffersRelations = relations(PromotionalOffersTable, ({ one, many }) => ({
  vehicle: one(VehicleTable, {
      fields: [PromotionalOffersTable.vehicle_id],
      references: [VehicleTable.vehicle_id],
  }),
  location: one(LocationBranchesTable, {
      fields: [PromotionalOffersTable.location_id],
      references: [LocationBranchesTable.location_id],
  }),
  bookingOffers: many(BookingOfferTable),
}));

export const bookingOfferRelations = relations(BookingOfferTable, ({ one }) => ({
  booking: one(BookingTable, {
      fields: [BookingOfferTable.booking_id],
      references: [BookingTable.booking_id],
  }),
  offer: one(PromotionalOffersTable, {
      fields: [BookingOfferTable.offer_id],
      references: [PromotionalOffersTable.offer_id],
  }),
}));
  



// Exporting the types
export type TIUser = typeof UsersTable.$inferInsert;
export type TSUser = typeof UsersTable.$inferSelect;

export type TIAuthorizeUsers = typeof AuthorizeUsersTable.$inferInsert;
export type TSAuthorizeUsers = typeof AuthorizeUsersTable.$inferSelect;

export type TILocationBranches = typeof LocationBranchesTable.$inferInsert;
export type TSLocationBranches = typeof LocationBranchesTable.$inferSelect;

export type TIVehicleSpecification = typeof VehicleSpecificationTable.$inferInsert;
export type TSVehicleSpecification = typeof VehicleSpecificationTable.$inferSelect;

export type TIVehicle = typeof VehicleTable.$inferInsert;
export type TSVehicle = typeof VehicleTable.$inferSelect;

export type TIFleetManagement = typeof FleetManagementTable.$inferInsert;
export type TSFleetManagement = typeof FleetManagementTable.$inferSelect;

export type TIBooking = typeof BookingTable.$inferInsert;
export type TSBooking = typeof BookingTable.$inferSelect;

export type TIPayment = typeof PaymentTable.$inferInsert;
export type TSPayment = typeof PaymentTable.$inferSelect;

export type TICustomerSupportTickets = typeof CustomerSupportTicketsTable.$inferInsert;
export type TSCustomerSupportTickets = typeof CustomerSupportTicketsTable.$inferSelect;

export type TIMaintainanceRecord = typeof MaintainanceRecordTable.$inferInsert;
export type TSMaintainanceRecord = typeof MaintainanceRecordTable.$inferSelect;

export type TIRatingsReviews = typeof ReviewsRatingTable.$inferInsert;
export type TSRatingsReviews = typeof ReviewsRatingTable.$inferSelect;

export type TIPromotionalOffers = typeof PromotionalOffersTable.$inferInsert;
export type TSPromotionalOffers = typeof PromotionalOffersTable.$inferSelect;

export type TIBookingOffer = typeof BookingOfferTable.$inferInsert;
export type TSBookingOffer = typeof BookingOfferTable.$inferSelect;

