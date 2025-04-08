import { Room, User } from "./store";
import { v1 as uuid } from "uuid";
export default class Manage implements User {
  name!: string | undefined;
  id!: string;
  private storage: Map<string, Room>;
  private roomName: string; // dont ask me why i have done this

  constructor() {
    this.storage = new Map<string, Room>();
    this.roomName = "";
  }

  initRoom(roomId: string, user?: User) {
    this.storage.set(roomId, { roomName: roomId, id: uuid(), chat: [] });
    this.id = uuid();
    this.roomName = roomId;
    this.name = user?.name;
    console.log(this.storage);
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
    console.log(this.storage);
  }
}
