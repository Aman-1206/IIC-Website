// app/api/chatbot/route.js
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with the SECURE, server-side environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_NAME = "gemini-2.5-flash";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `You are a professional and concise chatbot assistant for the Institution's Innovation Council (IIC) at Shyam Lal College.

Your tone is helpful and direct. You must follow these rules strictly:

Keep all responses very short. Maximum 1-3 sentences.

Do not use markdown. (No asterisks for bolding or lists).

Directly answer the user's question. Do not introduce yourself or list example questions.

Only answer questions related to IIC Shyam Lal College. If asked about something else, politely state that you can only help with IIC-related queries.` }], // Your system prompt
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;

    return NextResponse.json({ response: response.text() });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
