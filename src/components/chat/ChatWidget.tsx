"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import ChatMessage from "./ChatMessage";

interface ChatWidgetProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  primaryColor?: string;
  secondaryColor?: string;
  botName?: string;
  welcomeMessage?: string;
  placeholder?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  startDemo?: boolean;
  onDemoComplete?: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  isLoading?: boolean;
  followUpSuggestions?: string[];
}

const ChatWidget = ({
  position = "bottom-right",
  primaryColor = "#4f46e5",
  secondaryColor = "#ffffff",
  botName = "AI Assistant",
  welcomeMessage = "Hello! How can I help you today?",
  placeholder = "Type your message here...",
  isOpen: propIsOpen,
  onToggle,
  startDemo = false,
  onDemoComplete,
}: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(propIsOpen || false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: welcomeMessage,
      sender: "bot",
      timestamp: new Date(),
      followUpSuggestions: [
        "Tell me about your features",
        "How does this work?",
        "Pricing information",
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Demo conversation data
  const demoConversation = [
    {
      sender: "user",
      content: "Hi! I'm interested in your chat widget. How does it work?",
    },
    {
      sender: "bot",
      content:
        "Hello! Our AI-powered chat widget is designed to enhance customer engagement on your website. It uses advanced AI models to provide context-aware responses and can be customized to match your brand. Would you like to know about specific features?",
      suggestions: [
        "Integration process",
        "AI capabilities",
        "Customization options",
      ],
    },
    { sender: "user", content: "Tell me about the AI capabilities" },
    {
      sender: "bot",
      content:
        "Great question! Our widget supports multiple AI models including GPT, Gemini, and Mistral. It features:\n\n• Context-aware responses based on your knowledge base\n• Multi-language support\n• Sentiment analysis\n• Smart follow-up suggestions\n• Real-time learning from interactions\n\nThe AI can be trained on your specific content to provide accurate, brand-consistent responses.",
      suggestions: [
        "How to train the AI?",
        "Pricing details",
        "See integration guide",
      ],
    },
    { sender: "user", content: "How easy is the integration process?" },
    {
      sender: "bot",
      content:
        "Integration is incredibly simple! Just follow these steps:\n\n1. Copy our lightweight script tag (< 5KB)\n2. Paste it into your website's HTML\n3. Customize colors and settings in our dashboard\n4. Go live in minutes!\n\nNo technical expertise required. Our admin dashboard provides a visual interface for all customizations.",
      suggestions: [
        "Start free trial",
        "View documentation",
        "Contact support",
      ],
    },
    { sender: "user", content: "What about pricing?" },
    {
      sender: "bot",
      content:
        "We offer flexible pricing plans:\n\n🆓 **Starter**: Free for up to 100 messages/month\n💼 **Professional**: $29/month for 5,000 messages\n🚀 **Enterprise**: $99/month for unlimited messages\n\nAll plans include:\n• Full customization\n• Analytics dashboard\n• 24/7 support\n• Multiple AI models\n\nWould you like to start with our free trial?",
      suggestions: ["Start free trial", "Compare plans", "Schedule demo"],
    },
    { sender: "user", content: "Yes, I'd like to start the free trial" },
    {
      sender: "bot",
      content:
        "Excellent choice! 🎉\n\nI'll help you get started right away. You'll get:\n\n✅ Instant access to the admin dashboard\n✅ Pre-built templates and themes\n✅ Step-by-step setup guide\n✅ 14-day premium features trial\n\nClick the 'Start Free Trial' button above to create your account. You'll be up and running in less than 5 minutes!\n\nAny questions about the setup process?",
      suggestions: ["Setup questions", "Feature overview", "Contact sales"],
    },
    {
      sender: "user",
      content: "This looks perfect! Thanks for the detailed information.",
    },
    {
      sender: "bot",
      content:
        "You're very welcome! 😊 I'm thrilled that our chat widget seems like a great fit for your needs.\n\nRemember, our support team is always here to help during your setup and beyond. We're committed to making your customer engagement experience exceptional.\n\nWelcome to the future of intelligent customer support! 🚀",
      suggestions: ["Get started now", "Join community", "Follow updates"],
    },
  ];

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Demo conversation effect
  useEffect(() => {
    if (startDemo && demoStep < demoConversation.length) {
      const timer = setTimeout(
        () => {
          const currentMessage = demoConversation[demoStep];
          const newMessage: Message = {
            id: `demo-${demoStep}`,
            content: currentMessage.content,
            sender: currentMessage.sender as "user" | "bot",
            timestamp: new Date(),
            followUpSuggestions: currentMessage.suggestions,
          };

          if (currentMessage.sender === "user") {
            setMessages((prev) => [...prev, newMessage]);
            setDemoStep((prev) => prev + 1);
          } else {
            setIsTyping(true);
            setTimeout(() => {
              setMessages((prev) => [...prev, newMessage]);
              setIsTyping(false);
              setDemoStep((prev) => prev + 1);
            }, 1500);
          }
        },
        demoStep === 0 ? 1000 : 2500,
      );

      return () => clearTimeout(timer);
    } else if (
      startDemo &&
      demoStep >= demoConversation.length &&
      onDemoComplete
    ) {
      onDemoComplete();
    }
  }, [startDemo, demoStep, demoConversation.length, onDemoComplete]);

  // Reset demo when widget closes
  useEffect(() => {
    if (!isOpen) {
      setDemoStep(0);
      if (startDemo) {
        setMessages([
          {
            id: "welcome",
            content: welcomeMessage,
            sender: "bot",
            timestamp: new Date(),
            followUpSuggestions: [
              "Tell me about your features",
              "How does this work?",
              "Pricing information",
            ],
          },
        ]);
      }
    }
  }, [isOpen, startDemo, welcomeMessage]);

  // Handle toggle
  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (onToggle) {
      onToggle(newIsOpen);
    }
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content:
          "Thank you for your message! This is a simulated response from the AI assistant. In a real implementation, this would be generated by the AI model based on your input and the knowledge base.",
        sender: "bot",
        timestamp: new Date(),
        followUpSuggestions: [
          "Tell me more",
          "How does this work?",
          "Can you explain further?",
        ],
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Handle follow-up suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    // Auto-send the suggestion
    setTimeout(() => {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        content: suggestion,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          content: `Here's information about "${suggestion}". This is a simulated response that would be tailored to the specific follow-up question in a real implementation.`,
          sender: "bot",
          timestamp: new Date(),
          followUpSuggestions: [
            "Learn more",
            "Other features",
            "Contact support",
          ],
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    }, 300);
  };

  return (
    <div
      className={`${propIsOpen !== undefined ? "relative" : "fixed"} z-50 ${propIsOpen !== undefined ? "" : positionClasses[position]}`}
    >
      {/* Chat launcher button */}
      {!isOpen && (
        <Button
          onClick={handleToggle}
          className="rounded-full w-14 h-14 shadow-lg flex items-center justify-center"
          style={{ backgroundColor: primaryColor }}
        >
          <MessageCircle size={24} color={secondaryColor} />
        </Button>
      )}

      {/* Chat widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y:
                propIsOpen !== undefined
                  ? 0
                  : position.includes("bottom")
                    ? 20
                    : -20,
              transformOrigin:
                propIsOpen !== undefined
                  ? "center"
                  : position.includes("bottom")
                    ? "bottom"
                    : "top",
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y:
                propIsOpen !== undefined
                  ? 0
                  : position.includes("bottom")
                    ? 20
                    : -20,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`bg-background border rounded-lg shadow-xl ${propIsOpen !== undefined ? "w-full h-full" : "w-[380px] h-[600px]"} flex flex-col overflow-hidden`}
            style={{
              transformOrigin:
                propIsOpen !== undefined
                  ? "center"
                  : position.includes("bottom")
                    ? "bottom right"
                    : "top right",
            }}
          >
            {/* Header */}
            <div
              className="p-4 flex justify-between items-center border-b"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-primary-foreground">
                  <div className="text-xs font-medium">AI</div>
                </Avatar>
                <h3 className="font-medium" style={{ color: secondaryColor }}>
                  {botName}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggle}
                className="text-white hover:bg-primary/20"
              >
                <X size={18} />
              </Button>
            </div>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-4 bg-background">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  content={message.content}
                  type={message.sender === "user" ? "user" : "ai"}
                  timestamp={message.timestamp}
                  isLoading={message.isLoading}
                  followUpSuggestions={message.followUpSuggestions}
                  onFollowUpClick={handleSuggestionClick}
                />
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <Loader2 size={16} className="animate-spin" />
                  <span>{botName} is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t p-4 bg-background">
              <div className="flex gap-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={placeholder}
                  className="resize-none min-h-[60px] max-h-[120px]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  className="self-end"
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                  }}
                  disabled={!inputValue.trim()}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
