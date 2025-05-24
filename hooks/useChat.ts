'use client';

import { useState, useCallback, useRef } from 'react';
import { streamChatCompletion } from '@/lib/openai';

export type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  pending?: boolean;
};

export const SUGGESTED_QUESTIONS = [
  'What can you help me with?',
  'How does this 3D integration work?',
  'Tell me about this website'
];

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const pendingMessageId = useRef<string | null>(null);

  const addMessage = useCallback((content: string, role: 'user' | 'assistant' | 'system') => {
    const id = Math.random().toString(36).substring(2, 11);

    setMessages(prev => [
      ...prev,
      { id, content, role }
    ]);

    return id;
  }, []);

  const updateMessage = useCallback((id: string, content: string, pending: boolean = false) => {
    setMessages(prev =>
      prev.map(message =>
        message.id === id
          ? { ...message, content, pending }
          : message
      )
    );
  }, []);

  const sendMessage = useCallback((content: string) => {
    // Add user message
    addMessage(content, 'user');

    // Create a pending message for the assistant
    const assistantMessageId = addMessage('', 'assistant');
    pendingMessageId.current = assistantMessageId;

    // Start typing indicator
    setIsTyping(true);

    // Prepare all messages for the API
    const allMessages = [
      ...messages,
      { id: 'user-temp', content, role: 'user' as const }
    ].map(({ role, content }) => ({ role, content }));

    // Use promise chains as requested (instead of async/await)
    streamChatCompletion(allMessages, (chunk) => {
      if (pendingMessageId.current) {
        const currentContent = messages.find(m => m.id === pendingMessageId.current)?.content || '';
        updateMessage(
          pendingMessageId.current,
          currentContent + chunk,
          true
        );
      }
    })
      .then(() => {
        if (pendingMessageId.current) {
          const finalContent = messages.find(m => m.id === pendingMessageId.current)?.content || '';
          updateMessage(pendingMessageId.current, finalContent, false);
        }
        setIsTyping(false);
        pendingMessageId.current = null;
      })
      .catch(error => {
        console.error('Error in chat completion:', error);
        if (pendingMessageId.current) {
          updateMessage(
            pendingMessageId.current,
            "I'm sorry, but I encountered an error. Please try again later.",
            false
          );
        }
        setIsTyping(false);
        pendingMessageId.current = null;
      });
  }, [messages, addMessage, updateMessage]);

  return {
    messages,
    isTyping,
    sendMessage,
    addMessage,
    updateMessage
  };
}
