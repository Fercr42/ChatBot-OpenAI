require("dotenv").config();
const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al procesar el mensaje" });
  }
});

app.listen(3001, () => console.log("Backend listo en puerto 3001 🚀 "));
console.log(
  "API KEY:",
  process.env.OPENAI_API_KEY ? "✅ cargada" : "❌ no encontrada"
);
