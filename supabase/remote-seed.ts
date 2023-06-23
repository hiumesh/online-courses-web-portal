import { Client } from "pg";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

const hostname = process.env.HOST;
const port = process.env.PORT as unknown as number;
const database = process.env.DATABASE_NAME;
const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;

fs.readFile(path.join(__dirname, "./seed.sql"), "utf8", async (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }
  const client = new Client({
    host: hostname,
    port: port,
    database: database,
    user: username,
    password: password,
  });

  await client.connect();

  await client.query(data);

  client.end();
});
