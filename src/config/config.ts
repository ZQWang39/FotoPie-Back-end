import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.mkgi0yb.mongodb.net/test`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337;

const SECRET_KEY = process.env.SECRET_KEY || "";
const PUBLIC_KEY = process.env.PUBLIC_KEY || "";

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  jwtKey: {
    secretKey: SECRET_KEY,
    publicKey: PUBLIC_KEY,
  },
};
