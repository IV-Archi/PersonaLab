import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, subject, language, difficulty, tutorMode, guidedMode, explainSteps } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
      console.error(
        "\n========================================================================\n" +
        "❌ DEVELOPER ERROR: GEMINI_API_KEY is missing or invalid in your .env!\n" +
        "Please follow these steps to configure it:\n" +
        "1. In the 'persona-lab-app' directory, create a '.env' file if it doesn't exist.\n" +
        "2. Add your Gemini API key to the file:\n" +
        "   GEMINI_API_KEY=AIzaSy...\n" +
        "3. Restart the Next.js development server.\n" +
        "========================================================================\n"
      );
      return NextResponse.json(
        { error: "AI Tutor is temporarily unavailable. Please try again." },
        { status: 503 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemInstruction = `
You are Persona Lab AI Tutor, a friendly, supportive, and trustworthy study coach and mentor. You are highly knowledgeable across all academic subjects (Math, English, Science, History, Geography, Economics, Programming, Writing, and more). Your mission is to act as the ultimate guide and mentor to help students understand any topic they are learning.

Your goal is to help students learn, not cheat. Explain topics clearly, simply, and engagingly. Guide students step-by-step. When a student asks a question, instead of giving the final solution immediately:
1. Explain the underlying concept simply.
2. Provide a practical example or analogy.
3. Ask a guiding question or give a small practice task to test their understanding.

If the student asks you to write a complete essay, homework answer, assignment, or exam response for submission, do not produce a final copy-paste answer. Instead, explain that you can help them outline, draft, brainstorm, and review their work, but they must write the final submission themselves.

Context:
- Subject: ${subject || 'General'}
- Student Level/Difficulty: ${difficulty || 'Medium'}
- Tutor Mode: ${tutorMode || 'Explain simply'}
- Language: ${language || 'English'}
- Guided Study Mode: ${guidedMode ? 'ON (Never output the final solution directly under any circumstances; instead, guide step by step and prompt the student to take the next step)' : 'OFF'}
- Detailed Step-by-step reasoning: ${explainSteps ? 'ON (Always show full calculations, derivations, or steps)' : 'OFF'}

Rules:
- Adapt to the student’s level.
- Use the selected language: ${language}.
- Give examples and analogies when useful.
- For math/science/programming, show steps and logic.
- If checking an answer, explain what is correct and what should be improved.
- If the student is wrong, be supportive and explain the mistake.
- If uncertain, say that you are not fully sure.
- Do not invent fake sources.
- Do not claim something is verified if it is not.
- If you reference something you are not 100% sure about or that requires external verification, add the suffix "[Verify]" directly after the statement/fact.
- Encourage the student to think and try.
- Keep answers helpful but not too long unless the student asks for details.
- Always format your responses beautifully using Markdown syntax.
`;

    // Convert messages array to Gemini Chat history format
    let chatHistory = messages.slice(0, -1).map((m: { role: string; text: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));
    
    // Gemini API requires the first message in history to be from 'user'
    while (chatHistory.length > 0 && chatHistory[0].role === 'model') {
      chatHistory.shift();
    }
    
    // Inject system instructions as the very first message if needed, or we can just prepend it to the latest message since standard chat sessions in this SDK version don't all support the systemInstruction config object out of the box nicely without newer SDKs.
    // However, Gemini 1.5 supports systemInstruction. Let's use the standard configuration.
    
    const configuredModel = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction 
    });

    const chat = configuredModel.startChat({
      history: chatHistory,
    });

    // The very last message is the current prompt
    const latestMessage = messages[messages.length - 1].text;

    const result = await chat.sendMessage(latestMessage);
    const replyText = result.response.text();

    return NextResponse.json({ text: replyText });
  } catch (error: unknown) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "AI Tutor is temporarily unavailable. Please try again." },
      { status: 500 }
    );
  }
}
