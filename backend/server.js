const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const MY_KEY = "GEMINI_API_KEY"; 
const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");

app.post('/generate-verilog', async (req, res) => {
  const { prompt } = req.body;
  console.log("🚀 Generating Design + Testbench for:", prompt);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // We now ask for a JSON structure
    const systemInstruction = `You are a Verilog expert. 
    The user wants: ${prompt}.
    Task: Return a JSON object with exactly two keys:
    1. "design": The Verilog module code.
    2. "testbench": A complete Verilog testbench for that module.
    
    Constraint: Return ONLY the raw JSON. Do not include markdown backticks like \`\`\`json.`;

    const result = await model.generateContent(systemInstruction);
    const response = await result.response;
    let text = response.text();

    // Clean text just in case AI adds backticks
    const cleanJson = text.replace(/```json|```/g, '').trim();
    
    // Parse it to ensure it's valid, then send to frontend
    const verilogData = JSON.parse(cleanJson);
    
    console.log("✅ Successfully generated both modules.");
    res.json(verilogData); 

  } catch (error) {
    console.error("❌ API ERROR:", error.message);
    res.status(500).json({ error: "Failed to generate logic. Check API limits." });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Logic Server active on port ${PORT}`));