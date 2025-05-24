'use client';

import { SUGGESTED_QUESTIONS } from '@/hooks/useChat';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void;
}

export function SuggestedQuestions({ onSelectQuestion }: SuggestedQuestionsProps) {
  if (!SUGGESTED_QUESTIONS.length) return null;
  
  return (
    <div className="mb-4 px-4">
      <div className="text-sm font-medium mb-2 text-muted-foreground">
        Suggested questions
      </div>
      
      <div className="flex flex-col gap-2">
        {SUGGESTED_QUESTIONS.map((question, i) => (
          <motion.div
            key={question}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Button
              variant="outline"
              className="w-full justify-start text-left h-auto py-3 text-sm"
              onClick={() => onSelectQuestion(question)}
            >
              {question}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}