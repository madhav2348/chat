export interface Chat {
  id: string;
  message: string;
  createAt: string;
  userId: string;
}

export interface User {
  id?: string;
  name?: string;
}

export interface Room {
  id: string;
  roomName: string
  // userId: string;
  chat: Chat[];
}
