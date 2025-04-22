import { Room, User } from "./store";
import { v1 as uuid } from "uuid";
class Manage implements User {
  name!: string | undefined;
  id!: string;
  public roomID: string | "";
  private storage: Map<string, Room>;
  private roomName: string; // dont ask me why i have done this

  constructor() {
    this.storage = new Map<string, Room>();
    this.roomName = ""; // single quotes only , dont mess up
    this.roomID = "";
  }

  initRoom(roomName: string, user?: User) {
    this.storage.set(roomName, { roomName: roomName, id: uuid(), chat: [] });
    this.id = uuid();
    this.roomName = roomName;
    this.name = user?.name;
    this.roomID = this.storage.get(this.roomName)!.id;
  }

  // addUsers( user: User) {
  //   this.id = user.id;
  //   this.name = user.name;
  // }

  sendMessage(message: string) {
    const room = this.storage.get(this.roomName);

    if (!room) {
      return;
    }

    const chats = {
      id: uuid(),
      message: message,
      createAt: Date.now().toString(),
      userId: this.id,
    };

    this.storage.set(this.roomName, {
      id: room.id,
      chat: [...room.chat, chats],
      roomName: room.roomName,
    });
  }
}

export const manager = new Manage();
