import type { Message } from "ai"
import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("group flex w-full items-start gap-3 py-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-sm">
          <Bot className="h-4 w-4" />
        </div>
      )}

      <div
        className={cn(
          "flex max-w-[85%] flex-col gap-1 rounded-2xl px-4 py-3 text-sm",
          isUser
            ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md"
            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
        )}
      >
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>

      {isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sm">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}
