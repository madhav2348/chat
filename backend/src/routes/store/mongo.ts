import { Collection, Db, MongoClient } from "mongodb";
import { Chat, User , Room } from "./store";
class MongoDB {
  url: string;
  database: Db | undefined;
  private collectionUser: Collection ;
  private collectionRoom: Collection ;

  constructor() {
    const envUrl = process.env.DATABASE_URL;
    if (!envUrl) {
      throw new Error("No DB");
    }
    this.url = envUrl;

    this.collectionRoom = this.database?.collection('room')
    this.collectionUser = this.database?.collection('user')
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
     this.collectionUse = chatDB.collection("user");
     this.collectionRoom = chatDB.collection("room");
    } catch (e) {
      console.log(e);
    }
  }
  addUser(data:User) {
    this.database?.collection("user").insertOne({data});
  }
  addChat(room:Room){
    this.database?.collection('message').insertOne({room})
  }
  createRoom(){

  }
  getData() {
    return this.database?.collection("user").find();
  }
}
