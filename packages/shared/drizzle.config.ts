import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/schema",
	out: "./drizzle",
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DB_URL as string,
	}
});