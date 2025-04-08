export interface Chat {
  id: string;
  message: string;
  createAt: string;
  userId: User;
}

export interface User {
  id?: string;
  name: string;
}

export interface Room {
  id: string;
  chat: Chat[];
}
