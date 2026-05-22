import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, language } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json(
        { error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your .env file." },
        { status: 503 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Using responseSchema to enforce strict JSON structure
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            careerGoal: { type: SchemaType.STRING },
            coreSubjects: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  id: { type: SchemaType.STRING },
                  name: { type: SchemaType.STRING },
                  difficulty: { type: SchemaType.STRING },
                  whyUseful: { type: SchemaType.STRING },
                  resources: {
                    type: SchemaType.ARRAY,
                    items: {
                      type: SchemaType.OBJECT,
                      properties: {
                        title: { type: SchemaType.STRING },
                        url: { type: SchemaType.STRING },
                        type: { type: SchemaType.STRING }
                      },
                      required: ["title", "url", "type"]
                    }
                  }
                },
                required: ["id", "name", "difficulty", "whyUseful", "resources"]
              }
            },
            electives: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  id: { type: SchemaType.STRING },
                  name: { type: SchemaType.STRING },
                  difficulty: { type: SchemaType.STRING },
                  whyUseful: { type: SchemaType.STRING },
                  aiAdvice: { type: SchemaType.STRING },
                  resources: {
                    type: SchemaType.ARRAY,
                    items: {
                      type: SchemaType.OBJECT,
                      properties: {
                        title: { type: SchemaType.STRING },
                        url: { type: SchemaType.STRING },
                        type: { type: SchemaType.STRING }
                      },
                      required: ["title", "url", "type"]
                    }
                  }
                },
                required: ["id", "name", "difficulty", "whyUseful", "resources"]
              }
            }
          },
          required: ["careerGoal", "coreSubjects", "electives"]
        }
      }
    });

    const systemPrompt = `
You are the Persona Lab AI Course Planner. Your goal is to design a personalized learning path for a student based on their requested topic.
The requested topic is: "${topic}".
The response must be in this language: "${language || 'English'}".

For this topic:
1. Set the careerGoal to a logical job role or mastery target (e.g. "React Frontend Developer" or "Linear Algebra Mastery").
2. Core Subjects: Create 2-3 essential courses that the student MUST learn first.
   - For each course, provide a name, difficulty level (Easy, Medium, Hard), and why it is useful.
   - For resources: Strictly provide YouTube search query links (e.g. "https://www.youtube.com/results?search_query=learn+nextjs+beginners") or highly stable main landing pages (e.g. "https://nextjs.org/docs" or "https://www.khanacademy.org/math"). Do NOT generate deep course URLs to Coursera, edX, or MIT OCW that are prone to 404s.
3. Electives: Create 2 courses that are nice to have or extend their learning. Include AI advice on why they should study them.

Ensure all links are active. For YouTube videos or search terms, format the URL precisely as "https://www.youtube.com/results?search_query=..." with encoded search keywords.
`;

    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();
    const data = JSON.parse(responseText);

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error generating course path:", error);
    return NextResponse.json(
      { error: "Failed to generate course path. Please try again." },
      { status: 500 }
    );
  }
}
