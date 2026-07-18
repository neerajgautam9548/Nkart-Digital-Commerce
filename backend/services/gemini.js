const { GoogleGenAI } = require("@google/genai");

console.log(
"API Key:",
process.env.GEMINI_API_KEY?.substring(0, 10) + "..."
);
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

module.exports = ai;