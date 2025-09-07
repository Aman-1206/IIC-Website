import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const MODEL_NAME = "gemini-1.5-flash";

export async function getGeminiResponse(userMessage) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Optional: fetch live website content
    // const websiteContent = await fetchCollegePageContent();

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `You are a helpful assistant that only responds to queries about IIC | Shyam Lal College, its events, webinars, innovation council, etc.
When responding, always keep your answers very short and concise (1-2 lines only). Avoid long paragraphs or detailed elaboration.`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong. Please try again.";
  }
}
