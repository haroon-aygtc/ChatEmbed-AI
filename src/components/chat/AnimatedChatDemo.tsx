"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

interface AnimatedChatDemoProps {
  isPlaying?: boolean;
  onComplete?: () => void;
  primaryColor?: string;
  secondaryColor?: string;
}

interface DemoMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  delay: number;
  typingDuration?: number;
  followUpSuggestions?: string[];
}

interface TypingState {
  isTypingInInput: boolean;
  inputText: string;
  showSendEffect: boolean;
  isAiTyping: boolean;
}

const AnimatedChatDemo = ({
  isPlaying = false,
  onComplete,
  primaryColor = "#4f46e5",
  secondaryColor = "#ffffff",
}: AnimatedChatDemoProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<DemoMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [typingState, setTypingState] = useState<TypingState>({
    isTypingInInput: false,
    inputText: "",
    showSendEffect: false,
    isAiTyping: false,
  });

  // Enhanced demo script with realistic conversation flow
  const demoScript: DemoMessage[] = [
    {
      id: "welcome",
      content: "Hi! I'm your AI assistant. How can I help you today?",
      sender: "bot",
      delay: 800,
      typingDuration: 1200,
      followUpSuggestions: [
        "Tell me about features",
        "How does this work?",
        "Pricing info",
      ],
    },
    {
      id: "user1",
      content: "Can you tell me about your chat widget features?",
      sender: "user",
      delay: 3000,
      typingDuration: 1500,
    },
    {
      id: "bot1",
      content:
        "Absolutely! Our AI chat widget offers:\n\n• **Smart AI Integration** - Multiple models (GPT, Gemini, Mistral)\n• **Context-Aware Responses** - Learns from your knowledge base\n• **Easy Integration** - Just one script tag, under 5KB\n• **Real-time Analytics** - Track conversations and insights\n• **Custom Branding** - Match your website's design perfectly",
      sender: "bot",
      delay: 2000,
      typingDuration: 2500,
      followUpSuggestions: [
        "Integration steps",
        "See admin panel",
        "Pricing options",
      ],
    },
    {
      id: "user2",
      content: "How easy is the integration process?",
      sender: "user",
      delay: 4000,
      typingDuration: 1200,
    },
    {
      id: "bot2",
      content:
        "Super simple! Just 3 steps:\n\n**1. Copy & Paste** - Add our script to your website\n**2. Customize** - Use our admin dashboard to set colors, position, and AI behavior\n**3. Go Live** - Your intelligent chat is ready!\n\nNo coding required - everything is managed through our intuitive dashboard.",
      sender: "bot",
      delay: 2000,
      typingDuration: 2000,
      followUpSuggestions: [
        "Start free trial",
        "View dashboard",
        "See pricing",
      ],
    },
  ];

  // Reset demo when starting
  useEffect(() => {
    if (isPlaying) {
      setCurrentStep(0);
      setDisplayedMessages([]);
      setIsTyping(false);
      setTypingText("");
      setIsWidgetOpen(true);
      setTypingState({
        isTypingInInput: false,
        inputText: "",
        showSendEffect: false,
        isAiTyping: false,
      });
    } else {
      setIsWidgetOpen(false);
    }
  }, [isPlaying]);

  // Handle demo progression with realistic typing simulation
  useEffect(() => {
    if (!isPlaying || currentStep >= demoScript.length) {
      if (currentStep >= demoScript.length && onComplete) {
        setTimeout(onComplete, 2000);
      }
      return;
    }

    const currentMessage = demoScript[currentStep];
    const timer = setTimeout(() => {
      if (currentMessage.sender === "user") {
        // Simulate user typing in input field
        setTypingState((prev) => ({
          ...prev,
          isTypingInInput: true,
          inputText: "",
        }));

        let charIndex = 0;
        const userTypingInterval = setInterval(
          () => {
            if (charIndex < currentMessage.content.length) {
              setTypingState((prev) => ({
                ...prev,
                inputText: currentMessage.content.substring(0, charIndex + 1),
              }));
              charIndex++;
            } else {
              clearInterval(userTypingInterval);

              // Show send button effect
              setTimeout(() => {
                setTypingState((prev) => ({ ...prev, showSendEffect: true }));

                // After send effect, add message and start AI typing
                setTimeout(() => {
                  setDisplayedMessages((prev) => [...prev, currentMessage]);
                  setTypingState({
                    isTypingInInput: false,
                    inputText: "",
                    showSendEffect: false,
                    isAiTyping: true,
                  });

                  // Start AI typing after a brief delay
                  setTimeout(() => {
                    setCurrentStep((prev) => prev + 1);
                  }, 800);
                }, 300);
              }, 500);
            }
          },
          50 + Math.random() * 30,
        ); // Variable typing speed
      } else {
        // Bot messages with typing indicator
        setIsTyping(true);
        setTypingState((prev) => ({ ...prev, isAiTyping: false }));

        // Simulate AI typing effect
        let charIndex = 0;
        const typingInterval = setInterval(
          () => {
            if (charIndex < currentMessage.content.length) {
              setTypingText(currentMessage.content.substring(0, charIndex + 1));
              charIndex++;
            } else {
              clearInterval(typingInterval);
              setIsTyping(false);
              setTypingText("");
              setDisplayedMessages((prev) => [...prev, currentMessage]);
              setCurrentStep((prev) => prev + 1);
            }
          },
          25 + Math.random() * 15,
        ); // Variable AI typing speed
      }
    }, currentMessage.delay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, demoScript, onComplete]);

  return (
    <div className="relative">
      {/* Chat Launcher Button */}
      <AnimatePresence>
        {!isWidgetOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: primaryColor }}
                animate={{
                  scale: [1, 1.4],
                  opacity: [0.3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />

              <Button
                className="rounded-full w-14 h-14 shadow-lg relative z-10"
                style={{ backgroundColor: primaryColor }}
              >
                <MessageCircle size={24} color={secondaryColor} />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isWidgetOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-8 right-8 w-[360px] h-[580px] bg-background border rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-sm z-50"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Header */}
            <motion.div
              className="p-4 flex justify-between items-center border-b"
              style={{ backgroundColor: primaryColor }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Avatar className="h-8 w-8 bg-primary-foreground">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </Avatar>
                </motion.div>
                <h3 className="font-medium" style={{ color: secondaryColor }}>
                  ChatWidget AI
                </h3>
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-primary/20"
              >
                <X size={18} />
              </Button>
            </motion.div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-background">
              <AnimatePresence mode="popLayout">
                {displayedMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      stiffness: 300,
                      delay: index * 0.1,
                    }}
                    className={`flex w-full mb-4 ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex gap-3 max-w-[85%] ${
                        message.sender === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
                    >
                      <Avatar
                        className={`h-8 w-8 ${
                          message.sender === "user"
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                      >
                        {message.sender === "user" ? (
                          <User className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Bot className="h-4 w-4 text-secondary-foreground" />
                        )}
                      </Avatar>

                      <div className="flex flex-col">
                        <motion.div
                          className={`p-3 rounded-lg shadow-sm ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-card border"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <div className="whitespace-pre-wrap text-sm">
                            {message.content}
                          </div>
                        </motion.div>

                        {/* Follow-up suggestions */}
                        {message.sender === "bot" &&
                          message.followUpSuggestions && (
                            <motion.div
                              className="flex flex-wrap gap-2 mt-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              {message.followUpSuggestions.map(
                                (suggestion, i) => (
                                  <motion.button
                                    key={i}
                                    className="text-xs py-1 px-2 bg-muted hover:bg-muted/80 rounded-md border transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    {suggestion}
                                  </motion.button>
                                ),
                              )}
                            </motion.div>
                          )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-start gap-3 mb-4"
                  >
                    <Avatar className="h-8 w-8 bg-secondary">
                      <Bot className="h-4 w-4 text-secondary-foreground" />
                    </Avatar>
                    <div className="bg-card border p-3 rounded-lg shadow-sm max-w-[85%]">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 bg-primary/70 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: 0,
                            }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-primary/70 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: 0.2,
                            }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-primary/70 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: 0.4,
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          AI is typing...
                        </span>
                      </div>
                      {typingText && (
                        <motion.div
                          className="text-sm mt-2 whitespace-pre-wrap"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {typingText}
                          <motion.span
                            className="inline-block w-0.5 h-4 bg-primary ml-1"
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                          />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <motion.div
              className="border-t p-4 bg-background"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex gap-2 items-end">
                <div className="flex-1 min-h-[40px] bg-muted/50 rounded-md border px-3 py-2 text-sm flex items-center relative">
                  {typingState.isTypingInInput ? (
                    <motion.div
                      className="text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {typingState.inputText}
                      <motion.span
                        className="inline-block w-0.5 h-4 bg-primary ml-1"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    </motion.div>
                  ) : (
                    <span className="text-muted-foreground">
                      Type your message here...
                    </span>
                  )}
                </div>
                <motion.div
                  animate={{
                    scale: typingState.showSendEffect ? [1, 0.9, 1.1, 1] : 1,
                    backgroundColor: typingState.showSendEffect
                      ? "#22c55e"
                      : primaryColor,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    className="transition-all duration-200"
                    style={{
                      backgroundColor: typingState.showSendEffect
                        ? "#22c55e"
                        : primaryColor,
                      color: secondaryColor,
                    }}
                    size="sm"
                    disabled={!typingState.showSendEffect}
                  >
                    <motion.div
                      animate={{
                        rotate: typingState.showSendEffect
                          ? [0, -10, 10, 0]
                          : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Send size={16} />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedChatDemo;
