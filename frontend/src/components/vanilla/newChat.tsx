import React, { useState, useEffect, useRef } from 'react';
import './ChatApp.css';

// Define message interface
interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

// Define user interface
interface User {
  id: string;
  name: string;
}

// Define props for chat components
interface ChatMessageProps {
  message: Message;
  currentUser: User;
}

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

// Chat message component
const ChatMessage: React.FC<ChatMessageProps> = ({ message, currentUser }) => {
  const isOwnMessage = message.sender === currentUser.id;
  
  return (
    <div className={`message-container ${isOwnMessage ? 'own-message' : 'other-message'}`}>
      <div className="message-bubble">
        <div className="message-text">{message.text}</div>
        <div className="message-timestamp">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

// Chat input component
const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      // Focus back on input after sending
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

// Main chat application component
const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);
  const [roomId, setRoomId] = useState('demo-room');
  const [error, setError] = useState<string | null>(null);
  
  // Current user - in a real app, this would come from authentication
  const currentUser: User = {
    id: 'user-' + Math.floor(Math.random() * 1000).toString(),
    name: 'User-' + Math.floor(Math.random() * 1000).toString()
  };
  
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Connect to WebSocket
  useEffect(() => {
    connectWebSocket();

    return () => {
      // Clean up WebSocket connection when component unmounts
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [roomId]);

  const connectWebSocket = () => {
    setError(null);
    
    // Replace with your WebSocket server URL
    const serverUrl = `wss://your-websocket-server.com/chat?room=${roomId}&userId=${currentUser.id}`;
    
    try {
      ws.current = new WebSocket(serverUrl);
      
      ws.current.onopen = () => {
        console.log('Connected to WebSocket server');
        setConnected(true);
      };
      
      ws.current.onmessage = (event) => {
        try {
          const messageData = JSON.parse(event.data);
          const newMessage: Message = {
            id: messageData.id,
            text: messageData.text,
            sender: messageData.sender,
            timestamp: new Date(messageData.timestamp)
          };
          
          setMessages(prevMessages => [...prevMessages, newMessage]);
        } catch (err) {
          console.error('Error parsing message:', err);
        }
      };
      
      ws.current.onclose = () => {
        console.log('Disconnected from WebSocket server');
        setConnected(false);
        
        // Attempt to reconnect after a delay
        setTimeout(() => {
          if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
            connectWebSocket();
          }
        }, 3000);
      };
      
      ws.current.onerror = (err) => {
        console.error('WebSocket error:', err);
        setError('Connection error. Please try again later.');
        setConnected(false);
      };
    } catch (err) {
      console.error('Failed to connect to WebSocket server:', err);
      setError('Failed to connect. Please try again later.');
      setConnected(false);
    }
  };

  const sendMessage = (text: string) => {
    if (!connected || !ws.current) {
      setError('Not connected to chat server.');
      return;
    }
    
    const message = {
      text,
      sender: currentUser.id,
      timestamp: new Date().toISOString()
    };
    
    try {
      ws.current.send(JSON.stringify(message));
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Room: {roomId}</h2>
        <div className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
          {connected ? 'Connected' : 'Disconnected'}
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">No messages yet. Start the conversation!</div>
        ) : (
          messages.map(message => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              currentUser={currentUser} 
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput 
        onSendMessage={sendMessage} 
        disabled={!connected} 
      />
    </div>
  );
};

export default ChatApp;
