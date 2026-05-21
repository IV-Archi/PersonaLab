import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, subject, language, difficulty, tutorMode, guidedMode, explainSteps } = body;

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey.trim() === '' || apiKey === 'your_openai_api_key_here') {
      console.error(
        "\n========================================================================\n" +
        "❌ DEVELOPER ERROR: OPENAI_API_KEY is missing or invalid in your .env!\n" +
        "Please follow these steps to configure it:\n" +
        "1. In the 'persona-lab-app' directory, create a '.env' file if it doesn't exist.\n" +
        "2. Add your OpenAI API key to the file:\n" +
        "   OPENAI_API_KEY=sk-proj-...\n" +
        "3. Restart the Next.js development server.\n" +
        "========================================================================\n"
      );
      return NextResponse.json(
        { error: "AI Tutor is temporarily unavailable. Please try again." },
        { status: 503 }
      );
    }

    const systemInstruction = `
You are Persona Lab AI Tutor, a friendly and trustworthy study coach. Your goal is to help students learn, not copy. Explain topics clearly and simply. Guide students step by step. When possible, ask the student to try before giving the full answer. If the student asks for homework, essays, assignments, or exam answers, do not simply produce a final copy-paste answer. Instead, help with an outline, explanation, examples, hints, feedback, and practice. Always encourage independent thinking.

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
- Explain difficult ideas in simple words first.
- Give examples and analogies when useful.
- For math/science, show steps.
- If checking an answer, explain what is correct and what should be improved.
- If the student is wrong, be supportive and explain the mistake.
- If uncertain, say that you are not fully sure.
- Do not invent fake sources.
- Do not claim something is verified if it is not.
- If you reference something you are not 100% sure about or that requires external verification, add the suffix "[Verify]" directly after the statement/fact.
- Encourage the student to think and try.
- Keep answers helpful but not too long unless the student asks for details.

Learning flow:
1. Understand the question.
2. Explain the concept simply.
3. Give one example.
4. Ask a small follow-up question or give a short practice task.
5. If the student answers, check it and explain mistakes.
6. Recommend what to study next.

Academic honesty rule:
If a student asks you to write a complete essay, homework answer, assignment, or exam response for submission, respond like this (translated to the requested language: ${language}):
"I can help you understand the topic, create an outline, give examples, and review your draft, but you should write the final answer yourself."
`;

    const promptMessages = [
      { role: 'system', content: systemInstruction },
      ...messages.map((m: { role: string; text: string }) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text
      }))
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: promptMessages,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI API call failed:", errText);
      return NextResponse.json(
        { error: "AI Tutor is temporarily unavailable. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const replyText = data.choices?.[0]?.message?.content || "I was unable to formulate a response. Please try again.";

    return NextResponse.json({ text: replyText });
  } catch (error: unknown) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "AI Tutor is temporarily unavailable. Please try again." },
      { status: 500 }
    );
  }
}
