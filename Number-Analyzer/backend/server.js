import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;
const GEMINI_MODEL = process.env.GEMINI_MODEL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(express.json());
app.use(cors());

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

app.post("/api/gemini", async (req, res) => {
  const number = req.body.number;
  if (number) {
    const n = Number(number);
    if (isNaN(n) && n !== "" && n !== null && n !== undefined) {
      return res.status(400).json({
        success: false,
        error: "Invalid_input",
        message: "Enter a Valid number",
      });
    }
    const prompt = `Return ONLY a valid JSON object. 
    No markdown, no backticks, no extra text.
    The JSON must have THIS EXACT shape:
    {
    "number": <number>,
    "points": [
        "point1",
        "point2",
        "point3",
        "point4",
        "point5"
    ]
}

Each point must be a short interesting fact about the number ${n}.`;
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      temperature: 0,
    });
      const raw = response.text.trim()
      const parsed = JSON.parse(raw)
    res.status(200).json({
      success: true,
      message: "ai response fetched succcessfully",
      number: parsed.number,
      points: parsed.points
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Internal Error occured",
    });
  }
});

app.listen(PORT, () => {
  console.log(`The App is running on http://localhost:${PORT}`);
});
