require('dotenv').config(); // 1. THIS MUST BE AT THE VERY TOP
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// 2. Load the key from process.env (not a hardcoded string)
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// This will now show "YES" if your .env file is correct
console.log("API Key loaded:", apiKey ? "YES" : "NO");

const allowedOrigins = [
  'https://verilog-logic-helper.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

app.post('/generate-verilog', async (req, res) => {
  const { prompt } = req.body;
  console.log("🚀 Generating Design + Testbench for:", prompt);

  try {
    // Note: ensure you use a valid model name like "gemini-1.5-flash" 
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const systemInstruction = `You are a Verilog expert. 
    The user wants: ${prompt}.
    Task: Return a JSON object with exactly two keys:
    1. "design": The Verilog module code.
    2. "testbench": A complete Verilog testbench for that module.
    
    Constraint: Return ONLY the raw JSON. Do not include markdown backticks like \`\`\`json.`;

    const result = await model.generateContent(systemInstruction);
    const response = await result.response;
    const text = response.text();

    const cleanJson = text.replace(/```json|```/g, '').trim();
    const verilogData = JSON.parse(cleanJson);
    
    console.log("✅ Successfully generated both modules.");
    res.json(verilogData); 

  } catch (error) {
    console.error("❌ API ERROR:", error.message);
    res.status(500).json({ error: "Failed to generate logic. Check API limits." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Logic Server active on port ${PORT}`));