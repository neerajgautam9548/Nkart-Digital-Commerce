const ai = require("../services/gemini");

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: message,
    });

    res.json({
      reply: response.text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
      details: error,
    });
  }
};