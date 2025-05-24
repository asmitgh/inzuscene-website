// components/ChatbotButton.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { ChatWindow } from '../components/chat/ChatWindow';
import { ModelViewer } from './ModelViewer';

export function ChatbotButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // track cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleChat = () => setIsChatOpen((v) => !v);

  return (
    <>
      {/* invisible overlay to capture pointer */}
      <div className="fixed inset-0 z-10 pointer-events-none" />

      <motion.div
        className="fixed bottom-6 right-6 z-40 w-24 h-24 cursor-pointer"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={24} />
          </div>
        )}

        <ModelViewer
          url="/models/logo.glb"
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
          onLoad={() => setIsLoading(false)}
        />
      </motion.div>

      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
