'use client';

import { useEffect, useRef } from 'react';
import { Message, useChat } from '@/hooks/useChat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { SuggestedQuestions } from './SuggestedQuestions';
import { Heading } from '@/components/ui/typography';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const { messages, isTyping, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const showSuggestions = messages.length === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[95vw] rounded-2xl border bg-background shadow-lg overflow-hidden ${!isOpen ? 'pointer-events-none' : ''}`}
      style={{ height: '80vh', maxHeight: '600px' }}
    >
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between bg-background">
        <Heading size="md">AI Assistant</Heading>
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-1 h-[calc(100%-130px)]">
        <div className="px-2 py-4">
          {showSuggestions && (
            <>
              <ChatMessage 
                message={{ 
                  id: 'welcome', 
                  role: 'assistant', 
                  content: 'Hello! How can I help you today?' 
                }} 
              />
              <SuggestedQuestions onSelectQuestion={sendMessage} />
            </>
          )}
          
          {messages.map((message: Message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {/* Empty div for scrolling to the bottom */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Input */}
      <div className="absolute bottom-0 left-0 right-0">
        <ChatInput 
          onSendMessage={sendMessage} 
          disabled={isTyping}
          placeholder={isTyping ? "Assistant is typing..." : "Type your message..."}
        />
      </div>
    </motion.div>
  );
}