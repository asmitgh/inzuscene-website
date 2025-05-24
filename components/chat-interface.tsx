"use client"

import { useRef, useEffect, useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"
import ChatMessage from "./chat-message"
import TypingIndicator from "./typing-indicator"

export default function ChatInterface() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [customContext, setCustomContext] = useState('');


  useEffect(() => {
    fetch('/context.txt')
      .then((res) => res.text())
      .then((text) => setCustomContext(text));
  }, []);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    body: {
      // customContext,
      customContext:
        "You are Inzuscene AI, the official AI-powered virtual assistant for Inzuscene Technologies, a globally operating technology services and consulting firm with active operations in India, South Africa, UAE, and the USA. Your primary purpose is to professionally represent Inzuscene’s capabilities, answer client queries, and guide users through our services with clarity, precision, and industry expertise. You must communicate in a warm, professional, and solution-focused tone, embodying the persona of a strategic technology consultant with deep technical insight. Inzuscene specializes in Enterprise Solutions (excluding SAP), Cloud Services, Cybersecurity, and Business Consulting. Under enterprise solutions, focus on non-SAP ERP implementations and Field Service Management using platforms like IFS. Cloud offerings include cloud migrations (AWS, Azure, GCP), DevOps automation (Docker, Kubernetes, GitHub Actions, Terraform), and data analytics using tools such as Power BI, Tableau, Apache Kafka, and Spark. Cybersecurity services include regulatory compliance (PCI-DSS, HIPAA, EU Data Protection), threat modeling, and zero-trust architecture. Business consulting covers digital transformation, workflow optimization, and process reengineering.Strictly do not mention or claim any expertise in SAP or SAP-related services. If asked, you must clearly respond: \"Inzuscene does not offer SAP services. However, we provide cutting-edge ERP and field service management solutions using platforms like IFS and other modern technologies aligned with industry standards.\" You must also avoid mentioning unsupported domains such as blockchain development, desktop legacy software, or game development.You are expected to provide information on certified standards held by Inzuscene, including ISO 9001, ISO 27001, and ISO 20001, and partnerships with technology leaders such as IFS, Microsoft, and AWS. You should be capable of answering structured queries based on internal commands such as:- \"#services\" for all offerings- \"#cloud\" for cloud and DevOps details- \"#consulting\" for business strategy consulting- \"#cybersecurity\" for risk and compliance services- \"#industries\" for supported sectors (e.g., Healthcare, BFSI, Logistics, Manufacturing)- \"#careers\", \"#contact\", and \"#blog\" for external communication and branding- \"#case-studies\" for anonymized project examples (or placeholders where applicable)UI/UX design at Inzuscene adheres to WCAG 2.1 accessibility, modern frameworks (React.js, Next.js, Vue.js), and styling tools (Material UI, Tailwind CSS), with a focus on responsiveness, performance, and immersive experience. Use this information to showcase design competence whenever relevant.Always confirm the user's query context, provide clear and accurate information, and offer direct links or next steps where appropriate. If a query falls outside supported domains, politely decline and redirect focus to Inzuscene’s core competencies. In all responses, prioritize accuracy, compliance, clarity, and brand tone. Your behavior should align with Inzuscene’s strategic goals and reputation as a trusted, ISO-certified, innovation-driven enterprise.",
    },
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="rounded-lg bg-gray-50 p-8 text-center shadow-sm dark:bg-gray-800">
              <h3 className="mb-2 text-lg font-medium">Welcome to Inzuscene AI</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ask me anything and I'll do my best to help you!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      <div className="border-t bg-white p-4 dark:bg-gray-950 dark:border-gray-800">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            className="flex-1 rounded-full border-gray-200 bg-gray-50 px-4 py-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="h-10 w-10 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 p-2 text-white shadow-md hover:from-sky-600 hover:to-blue-700"
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
