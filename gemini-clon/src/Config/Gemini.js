import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCOEgkinzE9J7OY-hhqdcO3hEnxW3Gda6c"; 
const MODEL_NAME = "gemini-1.5-flash";

const genAI = new GoogleGenerativeAI(API_KEY);

async function runChat(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent([prompt]);

    const response = result.response;
    const text = await response.text();

    console.log(text);
    return text;

  } catch (error) {
    console.error("Error generating content:", error);

    if (error.message.includes("429")) {
      console.warn("⏳ Rate limit hit. Retrying after 30 seconds...");
      await new Promise(resolve => setTimeout(resolve, 30000)); 
      return runChat(prompt); 
    }
    return "⚠️ Failed to generate response due to API limits or other error.";
  }
}

export default runChat;
