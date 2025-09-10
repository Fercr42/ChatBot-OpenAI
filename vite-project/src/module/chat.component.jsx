import { useState } from "react";
import { ButtonComponent } from "../components";
import { InputComponent } from "../components";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const userMessage = message;
      setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
      setMessage("");

      try {
        console.log("🚀 Enviando mensaje al backend:", userMessage);
        const response = await fetch("http://localhost:3001/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage }),
        });

        console.log("📡 Respuesta del servidor:", response.status);
        const data = await response.json();
        console.log("📝 Datos recibidos:", data);
        setMessages((prev) => [...prev, { text: data.reply, sender: "ai" }]);
      } catch (error) {
        console.error("❌ Error:", error);
        setMessages((prev) => [
          ...prev,
          { text: "Error al conectar con el servidor", sender: "ai" },
        ]);
      }
    }
  };

  return (
    <div className="bg-black text-white border rounded-2xl w-[400px] h-[600px] m-4 flex flex-col lg:w-[1200px] lg:h-[800px]">
      <div className="flex items-center p-4 border-b border-gray-700">
        <ButtonComponent
          text="<"
          onClick={() => {}}
          className="size-8 hover:bg-gray-700 cursor-pointer rounded-lg mr-2"
        />
        <h1 className="text-xl font-semibold">Chat</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500">
        {messages.map((message, index) => (
          <div ref={messagesEndRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              key={index}
              className={`p-3 rounded-lg max-w-[80% ] ${
                message.sender === "user"
                  ? "bg-blue-600 text-white ml-auto hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-800 text-white mr-auto hover:bg-gray-700 cursor-pointer transform transition duration-300 ease-in-out"
              }`}
            >
              {message.text}
            </motion.div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700 p-4 bg-gray-800 rounded-3xl m-2 h-20 lg:h-28">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <InputComponent
            rows={1}
            value={message}
            onChange={setMessage}
            className="flex-1 rounded-lg focus:border-none focus:outline-none text-gray-400 bg-gray-800 resize-none overflow-hidden  "
          />
          <ButtonComponent
            text="enviar"
            type="submit"
            className="size-12 hover:bg-gray-700 cursor-pointer rounded-lg text-gray-400 lg:size-20"
          />
        </form>
      </div>
    </div>
  );
};
