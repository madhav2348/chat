// import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "../generated/prisma";

// const prisma = new PrismaClient();
// app.get("/", async (req, res) => {
//   const query = await prisma.user.findMany();
//   console.log(query);
// });
// import { WebSocketServer } from "ws";
// const wss = new WebSocketServer({ port: 5001 });
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import wss from "express-ws";

import { user, chat } from "./routes/page";
const app = wss(express()).app;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(user);
app.use(chat);

app.listen(process.env.PORT || 5000);
