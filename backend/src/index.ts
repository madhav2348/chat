// server.ts
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import router from './routes/page';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*', 
  },
});

app.use(cors());
app.use(express.json());

app.use(router)

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

io.on('connection', (socket: Socket) => {
  const { roomId, userId } = socket.handshake.query;

  if (typeof roomId === 'string') {
    socket.join(roomId);
   
  }

  socket.on('message', (data: Omit<Message, 'id'>) => {
    const fullMessage: Message = {
      id: uuidv4(),
      text: data.text,
      sender: data.sender,
      timestamp: data.timestamp || new Date().toISOString(),
    };

    if (typeof roomId === 'string') {
      io.to(roomId).emit('message', fullMessage);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User ${userId} disconnected`);
  });
});


const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
