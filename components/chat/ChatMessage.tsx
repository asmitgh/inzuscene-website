'use client';

import { cn } from '@/lib/utils';
import { Paragraph } from '@/components/ui/typography';
import { Message } from '@/hooks/useChat';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={cn(
        "flex gap-3 py-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <Bot size={16} />
        </div>
      )}
      
      <div 
        className={cn(
          "relative max-w-[80%] rounded-2xl px-4 py-3",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted"
        )}
      >
        <Paragraph 
          size="sm" 
          className={cn(
            "whitespace-pre-wrap", 
            message.pending && "after:inline-block after:w-1 after:h-4 after:bg-current after:animate-pulse"
          )}
        >
          {message.content || (message.pending ? " " : "...")}
        </Paragraph>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
          <User size={16} />
        </div>
      )}
    </div>
  );
}