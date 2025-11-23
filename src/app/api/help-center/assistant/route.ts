import { NextResponse } from "next/server";
import { helpAssistantContext } from "@/data/help-center";

const DEFAULT_MODEL = "deepseek-r1:14b";
const DEFAULT_HOST = "http://127.0.0.1:11434";

const sanitizeModelReply = (text?: string) => {
  if (!text) return undefined;

  const withoutReasoning = text
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, "")
    .replace(/<reflection>[\s\S]*?<\/reflection>/gi, "")
    .replace(/<thoughts?>[\s\S]*?<\/thoughts?>/gi, "");

  const cleaned = withoutReasoning
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s+$/g, "")
    .trim();

  return cleaned.length ? cleaned : undefined;
};

export async function POST(request: Request) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const ollamaHost = process.env.OLLAMA_HOST ?? DEFAULT_HOST;
    const ollamaModel = process.env.OLLAMA_MODEL ?? DEFAULT_MODEL;

    const formattedHistory = Array.isArray(conversationHistory)
      ? conversationHistory
          .slice(-10)
          .map((entry: { role?: string; content?: string }) => {
            const role = entry?.role === "assistant" ? "Agent" : "Customer";
            const content = entry?.content ?? "";
            return `${role}: ${content}`;
          })
          .join("\n")
      : "";

    const prompt = `You are the Volus AI Help Concierge. Use ONLY the knowledge base below. If an answer is unknown, apologize and direct the user to support@volus.ai.\n\nKnowledge Base:\n${helpAssistantContext}\n\nConversation so far:\n${formattedHistory}\n\nCustomer: ${message}\nAgent:`;

    const response = await fetch(`${ollamaHost}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: ollamaModel,
        prompt,
        stream: false,
        options: {
          temperature: 0.2,
          top_p: 0.9,
          repeat_penalty: 1.05,
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Ollama error", errorBody);
      return NextResponse.json(
        { error: "Assistant is unavailable" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = sanitizeModelReply(data?.response as string | undefined);

    return NextResponse.json({
      reply:
        reply ??
        "I couldn't surface that answer from our docs. Please email support@volus.ai and we'll jump in right away.",
    });
  } catch (error) {
    console.error("Help assistant failure", error);
    return NextResponse.json(
      { error: "Unable to reach help assistant" },
      { status: 500 }
    );
  }
}
