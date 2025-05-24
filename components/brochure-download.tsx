"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface BrochureDownloadProps {
  variant?: "banner" | "inline";
  onClose?: () => void;
}

export function BrochureDownload({
  variant = "inline",
  onClose,
}: BrochureDownloadProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ✅ Create a hidden link and auto-trigger download
      const link = document.createElement("a");
      link.href = "/downloads/Inzuscene - Empowering Ideas - 2025 CP.pdf"; // public file path
      link.download = "Inzuscene - Empowering Ideas - 2025 CP.pdf"; // force download with this filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Success!",
        description: "The brochure has been sent to your email.",
      });

      setEmail("");
      if (onClose) onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "banner") {
    return (
      <div className="bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600   py-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Download Our Corporate Brochure
              </h3>
              <p className="text-white">
                Get detailed insights into our services and solutions
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-w-[250px]"
                required
              />
              <Button type="submit" variant="secondary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center">
                    Sending...
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="ml-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  </span>
                ) : (
                  <span className="flex items-center">
                    Download <Download className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">
            Download Our Corporate Brochure
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Get comprehensive information about our services, solutions, and
            success stories.
          </p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            We'll send the brochure to your email address.
          </p>
        </div>

        <Button
          type="submit"
          className="w-full btn-gradient"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              Sending...
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="ml-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
              />
            </span>
          ) : (
            <span className="flex items-center justify-center">
              Download Brochure <Download className="ml-2 h-4 w-4" />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}