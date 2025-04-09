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
import routes from "./routes/page";

import wss from "express-ws";
import Manage from "./routes/store/manager";
const app = wss(express()).app;
const PORT = process.env.PORT || 5000;

const manager = new Manage();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,POST,",
  })
);
app.use(routes);
app.ws("/roomID", (ws, req) => {
  ws.on("message", (message) => {
    ws.send(message);
  });
});

app.use(routes);
app.listen(PORT, () => {
  console.log(`Backend is running on PORT ${PORT}`);
});
// app.listen(process.env.PORT || 5000);
