import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    return;
  }

  console.log("Using API Key:", apiKey.substring(0, 10) + "...");
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash" 
    });

    console.log("Testing with gemini-1.5-flash...");
    const result = await model.generateContent("Hello, are you there?");
    const response = await result.response;
    console.log("Response:", response.text());
  } catch (error) {
    console.error("Error detected:");
    console.error(error);
  }
}

test();
