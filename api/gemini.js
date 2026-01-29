/* global process */
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt, history, generationConfig } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('Missing GEMINI_API_KEY');
    return res.status(500).json({ error: 'AI Service configuration error' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const config = generationConfig || {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    };

    let result;
    if (history && history.length > 0) {
      const chat = model.startChat({
        history: history,
        generationConfig: config,
      });
      result = await chat.sendMessage(prompt);
    } else {
      result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: config,
      });
    }

    const response = await result.response;
    return res.status(200).json({ text: response.text() });
  } catch (error) {
    console.error('AI Service Error:', error.message);
    return res.status(500).json({ 
      error: 'AI assistant is currently unavailable. Please try again later.',
      details: error.message 
    });
  }
}
