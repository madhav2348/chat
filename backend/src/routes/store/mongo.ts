import { Db, MongoClient } from "mongodb";
class MongoDB {
  url: string;
  database: Db | undefined;

  constructor() {
    const envUrl = process.env.DATABASE_URL;
    if (!envUrl) {
      throw new Error("No DB");
    }
    this.url = envUrl;
  }

  async initialize() {
    const client = new MongoClient(this.url);
    try {
      await client.connect();
      const chatDB = client.db("chat");
      if (!chatDB) {
        throw new Error("Database not created");
      }
      this.database = chatDB;
      chatDB.collection("user");
      chatDB.collection("message");
    } catch (e) {
      console.log(e);
    }
  }
  addData() {
    this.database?.collection('user').insertOne({})
  }
  getData() {}
}
