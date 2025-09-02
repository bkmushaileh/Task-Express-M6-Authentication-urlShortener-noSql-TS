import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("Missing DB_URL in environment");
}

if (!process.env.JWTEXP) {
  throw new Error("Missing JWT in environment");
}
export const env = {
  PORT: process.env.PORT || "8000",
  DB_URL: process.env.MONGODB_URI,
  JWTEXP: process.env.JWTEXP,
  JWT_Secret: process.env.JWT_Secret,
};
