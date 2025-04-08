import express, { Request, Response } from "express";

const app = express();

export const user = app.post("/addUser", (req: Request, res: Response) => {
  const data = req.body;
  console.log(data)
  res.json({messafe:"done"})
});
export const chat = app.post("/chat", (req: Request, res: Response) => {
    const chat = req.body;
    console.log(chat);
    res.json({messafe:"ote oce"})
});
