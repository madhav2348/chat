import { Room, User } from "./store";
import { v1 as uuid } from "uuid";
class Manage implements User {
  name!: string;
  id!: string | undefined;
  private storage: Map<string, Room>;

  constructor() {
    this.storage = new Map<string, Room>();
    // this.name = new String
  }

  initRoom(roomId: string, user: User) {
    this.storage.set(roomId, { id: uuid(), chat: [] });
    this.id = user.id;
    this.name = user.name;
  }
}
