// components/chat-popup.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Minimize, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";
import ChatInterface from "./chat-interface";
import { motion, AnimatePresence } from "framer-motion";

/** ───────────────────────────────────────────────
 *  Props that let a parent open / close the popup
 *  ─────────────────────────────────────────────── */
export interface ChatPopupProps {
  /** `true` → show the chat window (controlled mode)            */
  isOpen: boolean;
  /** Called when the window asks to close itself (e.g. “X” btn) */
  onClose: () => void;
}

export default function ChatPopup({ isOpen, onClose }: ChatPopupProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  /* mark that the chat has been opened at least once
     (used only for the little greeting tooltip) */
  useEffect(() => {
    if (isOpen) setHasBeenOpened(true);
  }, [isOpen]);

  /* close on ESC  */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* ─────────── Chat popup ─────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div
              className={cn(
                "flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950",
                isMinimized ? "w-80" : "w-[90vw] md:w-[450px] lg:w-[500px]",
                isMinimized ? "h-16" : "h-[80vh] max-h-[700px]"
              )}
            >
              {/* header */}
              <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Inzuscene AI
                  </h3>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    {isMinimized ? (
                      <Maximize className="h-4 w-4" />
                    ) : (
                      <Minimize className="h-4 w-4" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* body */}
              {!isMinimized && (
                <div className="flex-1 overflow-hidden">
                  <ChatInterface />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* first-time greeting bubble (only if parent hasn’t opened it yet) */}
      <AnimatePresence>
        {!isOpen && !hasBeenOpened && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-[120px] right-6 z-40 w-72 rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800"
          >
            <div className="flex justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Hi, I'm Inzuscene AI!
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    How may I assist you today?
                  </p>
                </div>
              </div>

              <button
                onClick={() => setHasBeenOpened(true)}
                className="ml-2 mt-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </>
  );
}
