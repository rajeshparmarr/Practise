// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import { GoogleGenAI } from "@google/genai";
// import cors from "cors";

// const app = express();
// const PORT = process.env.PORT;
// const GEMINI_MODEL = process.env.GEMINI_MODEL;
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// app.use(express.json());
// app.use(cors());

// const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// app.post("/api/gemini", async (req, res) => {
//   const number = req.body.number;
//   if (number) {
//     const n = Number(number);
//     if (isNaN(n) && n !== "" && n !== null && n !== undefined) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid_input",
//         message: "Enter a Valid number",
//       });
//     }
//     const prompt = `Return ONLY a valid JSON object.
//     No markdown, no backticks, no extra text.
//     The JSON must have THIS EXACT shape:
//     {
//     "number": <number>,
//     "points": [
//         "point1",
//         "point2",
//         "point3",
//         "point4",
//         "point5"
//     ]
// }

// Each point must be a short interesting fact about the number ${n}.`;
//     const response = await ai.models.generateContent({
//       model: GEMINI_MODEL,
//       contents: prompt,
//       temperature: 0,
//     });
//       const raw = response.text.trim()
//       const parsed = JSON.parse(raw)
//     res.status(200).json({
//       success: true,
//       message: "ai response fetched succcessfully",
//       number: parsed.number,
//       points: parsed.points
//     });
//   } else {
//     return res.status(500).json({
//       success: false,
//       message: "Internal Error occured",
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`The App is running on http://localhost:${PORT}`);
// });




// server.js (or wherever your route is)
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_MODEL = process.env.GEMINI_MODEL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(express.json());
app.use(cors());

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

/*
 Accept arbitrary input from the user (req.body.input).
 The prompt instructs Gemini to return only a JSON object with the shape we expect.
 We also perform tolerant parsing: if the model adds extra text, we try to extract the JSON substring.
*/
app.post("/api/gemini", async (req, res) => {
  try {
    const userInput = (req.body.input ?? "").toString().trim();
    if (!userInput) {
      return res.status(400).json({ success: false, message: "input is required" });
    }

    const prompt = `Return ONLY a valid JSON object. No markdown, no backticks, no extra text.
The JSON must have THIS EXACT shape:
{
  "query": "<the user's input as a string>",
  "points": [
    "point1",
    "point2",
    "point3",
    "point4",
    "point5"
  ]
}

Each point must be a short interesting fact or useful info about: ${userInput}
Make points short (one sentence max).
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      temperature: 0.2,
    });

    // model response text (may include newlines/extra text)
    const raw = (response.text ?? "").trim();

    // Try to parse raw as JSON directly; if it fails, try to extract the first {...} block
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      // fallback: extract first {...} substring
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          parsed = JSON.parse(match[0]);
        } catch (err2) {
          return res.status(502).json({
            success: false,
            message: "Failed to parse AI response as JSON",
            raw,
          });
        }
      } else {
        return res.status(502).json({
          success: false,
          message: "AI response did not contain valid JSON",
          raw,
        });
      }
    }

    // Basic validation of expected shape
    if (!parsed || !Array.isArray(parsed.points)) {
      return res.status(502).json({
        success: false,
        message: "AI returned unexpected JSON shape",
        parsed,
      });
    }

    return res.status(200).json({
      success: true,
      message: "ai response fetched successfully",
      query: parsed.query ?? userInput,
      points: parsed.points.slice(0, 5),
      raw,
    });
  } catch (err) {
    console.error("Error /api/gemini:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`The App is running on http://localhost:${PORT}`);
});
