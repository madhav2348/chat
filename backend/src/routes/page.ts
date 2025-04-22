import { Request, Response, Router } from "express";
import {manager} from "./store/manager";

const router = Router();



router.post("/addUser", (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  
  manager.initRoom(data.room, { name: data.name });
  res.json({ message: "done", roomID: manager.roomID });
});

router.post("/chat", (req: Request, res: Response) => {
  const chat = req.body;
  manager.sendMessage(chat.message);

  res.json({ message: "chat " });
});

export default router;
