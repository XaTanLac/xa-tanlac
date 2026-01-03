import * as dotenv from "dotenv";
dotenv.config();

export const env = (key) => process.env[key];
