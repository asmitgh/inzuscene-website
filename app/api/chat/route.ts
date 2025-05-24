import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import type { NextRequest } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export const runtime = "nodejs"
export const maxDuration = 30 // Allow streaming responses up to 30 seconds

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Read context from public/context.txt
    const contextPath = path.join(process.cwd(), "public", "context.txt")
    const contextText = await fs.readFile(contextPath, "utf8")

    // Construct the system message
    const systemMessage = {
      role: "system",
      content: contextText.trim(),
    }

    // Add system message to the beginning if not already present
    const hasSystemMessage = messages.some((m: any) => m.role === "system")
    const messagesWithContext = hasSystemMessage ? messages : [systemMessage, ...messages]

    // Stream the response from OpenAI
    const result = await streamText({
      model: openai("gpt-4o"),
      messages: messagesWithContext,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
