import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
// Типы для сообщений
interface Message {
  id: number;
  content: string;
  isClient: boolean;
}

const Socket: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // Ссылка на контейнер сообщений для прокрутки
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Подключение к WebSocket
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");
    setSocket(ws);

    ws.onmessage = (event: MessageEvent) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          content: JSON.parse(event.data).text,
          isClient: Boolean(parseInt(JSON.parse(event.data).isClient)),
        },
      ]);
    };

    ws.onerror = (event: Event) => {
      console.error("WebSocket ошибка", event);
    };

    ws.onclose = () => {
      console.log("WebSocket соединение закрыто");
    };

    return () => ws.close();
  }, []);

  // Отправка сообщения
  const sendMessage = () => {
    if (socket && input.trim()) {
      const newMessage = input;
      socket.send(newMessage);

      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, content: newMessage, isClient: true },
      ]);

      setInput("");
    }
  };

  // Отправка сообщения при нажатии Enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // Прокрутка к последнему сообщению
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <h1>Онлайн-Чат</h1>
      <div className="chat-box">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.isClient ? "client" : "server"}`}
          >
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Введите сообщение"
        />
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
};

export default Socket;
