import sqlite3, { Database } from "sqlite3";
import { open } from "sqlite";

interface Message {
  id: number;
  username: string;
  message: string;
  created_at: string;
}

class SQLite {
  db: any | undefined;
  constructor() {
    sqlite3.verbose();
    this.db;
  }

  // db.exec = multiple query
  // db.run = one query
  // db.get = one row
  // db.all = zero to most rows

  async startDB() {
    const db = await open({
      filename: "./database.db",
      driver: sqlite3.cached.Database,
    });
    db.run(`CREATE TABLE IF NOT EXISTS messages( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
  }
  addData(username: string, message: string) {
    this.db.run(
      `INSERT INTO message (username, message) VALUES (${username}, ${message})`
    );
  }
  getData() {
    this.db.all(`SELECT * FROM message`);
  }
}

export default SQLite;