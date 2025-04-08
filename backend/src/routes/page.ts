import express, { Request, Response, Router } from "express";
import wss from "express-ws";
import Manage from "./store/manager";
const app = wss(express()).app;

const router = Router();

const manager = new Manage();

router.post("/addUser", (req: Request, res: Response) => {
  const data = req.body;
  manager.initRoom(data.room, { name: data.name });
  res.json({ message: "done" });
});

router.post("/chat", (req: Request, res: Response) => {
  const chat = req.body;
  manager.sendMessage(chat.message);

  res.json({ message: "chat " });
});

export default router;
