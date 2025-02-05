import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified").notNull(),
  profilePictureUrl: text("profile_picture_url"),
  refreshToken: text("refresh_token").notNull(),
});
