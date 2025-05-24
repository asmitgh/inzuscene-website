import { Bot } from "lucide-react"

export default function TypingIndicator() {
  return (
    <div className="group flex w-full items-start gap-3 py-2">
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-sm">
        <Bot className="h-4 w-4" />
      </div>

      <div className="flex max-w-[85%] flex-col gap-1 rounded-2xl px-4 py-3 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "0ms" }}></div>
          <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "300ms" }}></div>
          <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "600ms" }}></div>
        </div>
      </div>
    </div>
  )
}
