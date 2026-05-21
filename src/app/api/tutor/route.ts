import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, subject, language, difficulty, guidedMode, explainSteps } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    // Enforce prompt instructions based on the model's study coach role
    const systemInstruction = `
You are Labby, a friendly, clear, supportive, and educational AI study coach for Persona Lab.
Your primary role is to help students learn independently, practice smarter, and build real academic understanding.

RULES FOR GUIDED LEARNING & ACADEMIC HONESTY:
1. Do NOT write full homework answers, complete essays, or final code solutions directly when asked. 
2. If asked to "write my essay" or "solve this equation for me", respond stating that you can explain the concepts, provide outline structures, or show step-by-step guides, but the student must draft the final answer themselves.
3. Use the following structured learning flow:
   - Understand the student's question.
   - Infer or ask for the student's current understanding.
   - Explain the underlying concept simply first with real-life examples.
   - Provide a step-by-step hint rather than the final resolution.
   - Ask the student a quick check question to test their understanding.
   - When the student replies, provide clear corrective feedback, explain their mistakes warmly, and suggest the next study step.
4. Adjust explanation complexity based on: Subject: ${subject}, Difficulty Level: ${difficulty}.
5. You MUST respond ONLY in the language requested: ${language}.
6. ${explainSteps ? 'Provide detailed step-by-step reasoning for formulas and scientific statements.' : 'Explain concisely and simply.'}
7. ${guidedMode ? 'Enforce strict guided questioning. Never output the final solution under any circumstances. Keep prompting the student to take the next step.' : ''}
8. Add a warning indicator [Verify] in your text if you mention facts that require verification or if you are not 100% certain of the reference source. Say when you are not sure.
`;

    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined. Using adaptive fallback tutor service.");
      // Return a smart fallback response that acts like a real coach
      const lastUserMessage = messages[messages.length - 1]?.text || "";
      const fallbackResponse = getFallbackCoachResponse(lastUserMessage, subject, language, difficulty, guidedMode);
      return NextResponse.json({ text: fallbackResponse });
    }

    const promptMessages = [
      { role: 'user', parts: [{ text: systemInstruction }] },
      ...messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }))
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: promptMessages })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API call failed:", errText);
      return NextResponse.json({ error: "Failed to communicate with AI endpoint" }, { status: 500 });
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I was unable to formulate a response. Please try again.";

    return NextResponse.json({ text: replyText });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

function getFallbackCoachResponse(
  message: string,
  subject: string,
  lang: string,
  difficulty: string,
  guidedMode: boolean
): string {
  const isKz = lang.toLowerCase().includes('қазақ') || lang.toLowerCase() === 'kz';
  const isRu = lang.toLowerCase().includes('рус') || lang.toLowerCase() === 'ru';

  const normalized = message.toLowerCase();

  // Handle write essay cheating attempt
  if (normalized.includes('write') || normalized.includes('напиши') || normalized.includes('жаз')) {
    if (isKz) {
      return "Мен сізге эссе жоспарын құруға, тақырыпты түсіндіруге және мысалдар келтіруге көмектесе аламын, бірақ соңғы нұсқаны өзіңіз жазуыңыз керек. Эссеңізді қандай тақырыпқа арнағыңыз келеді? 📝";
    }
    if (isRu) {
      return "Я могу помочь вам составить план эссе, объяснить тему и привести примеры, но написать финальный текст вы должны самостоятельно. Какова тема вашего эссе? 📝";
    }
    return "I can help you build an outline, explain the topic, provide examples, and review your draft, but you should write the final answer yourself. What is the topic of your essay? 📝";
  }

  // General responsive mock tutor guidance flow
  if (isKz) {
    return `Сәлем! Мен ${subject} бойынша көмекшіңізбін (${difficulty} деңгейі). Сіздің сұрағыңызды түсіндім. \n\nТікелей жауап берудің орнына, бірге қадамдап шешейік. Осы тақырып бойынша не білесіз? Маған бірінші қадамыңызды көрсетіңіз, сосын бірге талқылаймыз. ✨`;
  }
  if (isRu) {
    return `Привет! Я твой наставник по предмету: ${subject} (${difficulty}). Я вижу твой вопрос.\n\nВместо того чтобы просто дать ответ, давай разберем его по шагам. Что ты уже знаешь по этой теме? Попробуй предложить свой вариант первого шага, и мы проверим его. ✨`;
  }
  return `Hi! I'm your coach for ${subject} (${difficulty} level). I see your question.\n\nRather than just giving you the answer, let's break it down together. What do you already know about this? Try explaining your first step, and we'll check it! ✨`;
}
