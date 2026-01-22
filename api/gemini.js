import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt, history, generationConfig } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set in environment variables');
    return res.status(500).json({ error: 'AI Service configuration error' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Using gemini-1.5-flash as recommended
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash" 
    });

    // If history is provided, we can use startChat for context-aware conversations
    // Otherwise, we use generateContent for a single prompt
    
    let result;
    if (history && history.length > 0) {
      const chat = model.startChat({
        history: history,
        generationConfig: generationConfig || {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });
      result = await chat.sendMessage(prompt);
    } else {
      result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: generationConfig || {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });
    }

    const response = await result.response;
    const text = response.text();
    
    return res.status(200).json({ text });
  } catch (error) {
    console.error('Error in Gemini API handler:', error);
    return res.status(500).json({ 
      error: 'Error calling Gemini API', 
      details: error.message 
    });
  }
}
