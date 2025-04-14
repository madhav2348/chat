import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import "./ChatApp.css";
import { user } from "./mockups";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

interface User {
  id: string;
  name: string;
}

interface ChatMessageProps {
  message: Message;
  currentUser: User;
}

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

const getOrCreateUser = (): User => {
  let id = localStorage.getItem("userId");
  let name = localStorage.getItem("userName");

  if (!id || !name) {
    id = 'user-' + Math.floor(Math.random() * 10000).toString();
    name = 'User-' + Math.floor(Math.random() * 10000).toString();
    localStorage.setItem("userId", id);
    localStorage.setItem("userName", name);
  }

  return { id, name };
};


const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  currentUser ,
}) => {
  const isOwnMessage = currentUser.name === message.sender;
  console.log(currentUser.id);
  console.log(message.id)
  console.log(isOwnMessage);

  return (
    <div
      className={`message-container ${
        isOwnMessage ? "own-message" : "other-message"
      }`}
    >
      <div className="message-bubble">
        <div className="message-text">{message.text}</div>
        <div className="message-timestamp">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      inputRef.current?.focus();
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        disabled={disabled}
        className="message-input"
        autoFocus
      />
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className="send-button"
      >
        Send
      </button>
    </form>
  );
};

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const roomId = "demo-room";

  const currentUser: User = getOrCreateUser()

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      query: { roomId, userId: currentUser.id },
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to socket.io server");
      setConnected(true);
    });

    socket.on("message", (msg: Message) => {
      setMessages((prev) => [
        ...prev,
        { ...msg, timestamp: new Date(msg.timestamp) },
      ]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket.io server");
      setConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      setError("Connection error. Please try again.");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!socketRef.current) return;
    const msg: Omit<Message, "id"> = {
      text,
      sender: currentUser.id,
      timestamp: new Date(),
    };
    socketRef.current.emit("message", msg);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Room: {roomId}</h2>
        <div
          className={`connection-status ${
            connected ? "connected" : "disconnected"
          }`}
        >
          {connected ? "Connected" : "Disconnected"}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="messages-container">
      <ChatMessage  message={user.user1.message} currentUser={user.user1.currentUser} />
      <ChatMessage  message={user.user2.message} currentUser={user.user2.currentUser} />

        {messages.length === 0 ? (
          <div className="no-messages">
            {/* No messages yet. Start the conversation! */}
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} currentUser={currentUser} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={sendMessage} disabled={!connected} />
    </div>
  );
};

export default ChatApp;
