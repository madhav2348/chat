import express, { Request, Response, Router } from "express";
import wss from "express-ws";
import Manage from "./store/manager";
const app = wss(express()).app;

const router = Router();
const manager = new Manage();
router.post("/addUser", (req: Request, res: Response) => {
  const data = req.body;
  manager.initRoom(data.room, { name: data.name });
  // console.log(data);
  res.json({ message: "done" });
});
router.post("/chat", (req: Request, res: Response) => {
  const chat = req.body;
  // manager.initRoom(data.room, { name: data.name });
  manager.sendMessage(chat.message);

  console.log(chat);
  res.json({ message: "chat " });
});

export default router;
