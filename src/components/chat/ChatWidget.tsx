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

  // Demo conversation data - Optimized for professional showcase
  const demoConversation = [
    {
      sender: "user",
      content: "Hi! I'm interested in your chat widget. How does it work?",
    },
    {
      sender: "bot",
      content:
        "Hello! 👋 Our AI-powered chat widget seamlessly integrates into any website to enhance customer engagement.\n\n**Key Features:**\n• Context-aware AI responses\n• Multiple AI model support (GPT, Gemini, Mistral)\n• Real-time WebSocket communication\n• Customizable branding & themes\n• Sub-5KB lightweight loader\n\nWhat aspect interests you most?",
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
        "Excellent question! Our AI system is built for enterprise-grade performance:\n\n🧠 **Smart AI Features:**\n• Knowledge base integration for context-aware responses\n• Multi-language support (50+ languages)\n• Sentiment analysis & intent recognition\n• Dynamic follow-up suggestions\n• Conversation memory & learning\n\n🔧 **Admin Control:**\n• Visual prompt flow editor\n• Custom response templates\n• AI model switching & routing\n• Performance analytics\n\nThe AI learns from your content to provide brand-consistent, accurate responses.",
      suggestions: ["How to train the AI?", "Integration guide", "See pricing"],
    },
    { sender: "user", content: "How to train the AI?" },
    {
      sender: "bot",
      content:
        "Training your AI is incredibly intuitive! 🎯\n\n**Simple 3-Step Process:**\n\n1️⃣ **Upload Content**\n   • Documents, FAQs, product info\n   • Drag & drop interface\n   • Auto-parsing & indexing\n\n2️⃣ **Configure Behavior**\n   • Set response tone & style\n   • Define conversation flows\n   • Create custom templates\n\n3️⃣ **Test & Deploy**\n   • Live preview mode\n   • A/B testing tools\n   • One-click deployment\n\n**Result:** AI that speaks your brand language and knows your business inside-out!",
      suggestions: ["Integration process", "Pricing plans", "Start free trial"],
    },
    { sender: "user", content: "What's the integration process like?" },
    {
      sender: "bot",
      content:
        "Integration is designed for non-technical users! ⚡\n\n**Ultra-Simple Setup:**\n\n```html\n<script>\n(function(w,d,s){\n  // 5KB loader script\n  w.ChatWidget=w.ChatWidget||{};\n  // Auto-initialization\n})(window,document);\n</script>\n```\n\n**Complete Process:**\n✅ Copy script tag (30 seconds)\n✅ Paste before </body> tag\n✅ Customize in dashboard\n✅ Go live instantly!\n\n**No coding required** - our visual dashboard handles everything else.",
      suggestions: ["See pricing", "Start free trial", "View documentation"],
    },
    { sender: "user", content: "What are your pricing plans?" },
    {
      sender: "bot",
      content:
        "We offer transparent, scalable pricing for every business size:\n\n💎 **Starter Plan - FREE**\n• 1,000 messages/month\n• Basic AI models\n• Standard customization\n• Email support\n\n🚀 **Professional - $29/month**\n• 10,000 messages/month\n• Advanced AI models (GPT-4, Gemini)\n• Full customization suite\n• Priority support + live chat\n• Analytics dashboard\n\n🏢 **Enterprise - $99/month**\n• Unlimited messages\n• All AI models + custom training\n• White-label solution\n• Dedicated account manager\n• SLA guarantee\n\n**All plans include 14-day free trial!**",
      suggestions: ["Start free trial", "Compare features", "Contact sales"],
    },
    { sender: "user", content: "I'd like to start the free trial" },
    {
      sender: "bot",
      content:
        "Fantastic choice! 🎉 Let's get you set up with full access:\n\n**Your Free Trial Includes:**\n✅ Complete admin dashboard access\n✅ All Professional plan features\n✅ Pre-built templates & themes\n✅ Step-by-step onboarding guide\n✅ Priority email support\n✅ No credit card required\n\n**Next Steps:**\n1. Click 'Start Free Trial' above\n2. Create your account (2 minutes)\n3. Follow our setup wizard\n4. Deploy your first widget!\n\n**You'll be live in under 5 minutes!** 🚀\n\nReady to transform your customer engagement?",
      suggestions: ["Setup questions", "Feature overview", "Contact support"],
    },
  ];

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  // Enhanced scroll to bottom with smooth animation
  useEffect(() => {
    if (messagesEndRef.current) {
      // Always scroll for better UX, with smooth animation
      const scrollContainer = messagesEndRef.current.parentElement;
      if (scrollContainer) {
        const scrollToBottom = () => {
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: "smooth",
          });
        };

        // Small delay to ensure DOM is updated
        setTimeout(scrollToBottom, 100);
      }
    }
  }, [messages]);

  // Demo conversation effect - Enhanced with realistic timing
  useEffect(() => {
    if (startDemo && demoStep < demoConversation.length) {
      const currentMessage = demoConversation[demoStep];
      const isUserMessage = currentMessage.sender === "user";

      // Realistic timing based on message type and length
      const getMessageDelay = () => {
        if (demoStep === 0) return 1200; // Initial delay
        if (isUserMessage) {
          // User typing simulation based on message length
          return Math.max(800, currentMessage.content.length * 30);
        } else {
          // Bot processing time simulation
          return Math.max(1200, currentMessage.content.length * 15);
        }
      };

      const timer = setTimeout(() => {
        const newMessage: Message = {
          id: `demo-${demoStep}`,
          content: currentMessage.content,
          sender: currentMessage.sender as "user" | "bot",
          timestamp: new Date(),
          followUpSuggestions: currentMessage.suggestions,
        };

        if (isUserMessage) {
          // Show user typing briefly before message appears
          setInputValue(currentMessage.content);
          setTimeout(() => {
            setMessages((prev) => [...prev, newMessage]);
            setInputValue("");
            setDemoStep((prev) => prev + 1);
          }, 600);
        } else {
          // Show bot typing indicator before response
          setIsTyping(true);
          setTimeout(
            () => {
              setMessages((prev) => [...prev, newMessage]);
              setIsTyping(false);
              setDemoStep((prev) => prev + 1);
            },
            Math.min(2000, Math.max(1000, currentMessage.content.length * 8)),
          );
        }
      }, getMessageDelay());

      return () => clearTimeout(timer);
    } else if (
      startDemo &&
      demoStep >= demoConversation.length &&
      onDemoComplete
    ) {
      // Demo completion with slight delay
      setTimeout(() => {
        onDemoComplete();
      }, 1500);
    }
  }, [startDemo, demoStep, demoConversation.length, onDemoComplete]);

  // Reset demo when widget closes or demo restarts
  useEffect(() => {
    if (!isOpen || (startDemo && demoStep === 0)) {
      setDemoStep(0);
      setIsTyping(false);
      setInputValue("");
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
  }, [isOpen, startDemo, welcomeMessage, demoStep]);

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
      className={`${propIsOpen !== undefined ? "absolute" : "fixed"} z-50 ${propIsOpen !== undefined ? "bottom-6 right-6" : positionClasses[position]}`}
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
            className={`bg-background border rounded-xl shadow-2xl ${propIsOpen !== undefined ? "w-[360px] h-[480px]" : "w-[380px] h-[600px]"} flex flex-col backdrop-blur-sm`}
            style={{
              overflow: "hidden",
              height: propIsOpen !== undefined ? "480px" : "600px",
              minHeight: propIsOpen !== undefined ? "480px" : "600px",
              maxHeight: propIsOpen !== undefined ? "480px" : "600px",
              transformOrigin:
                propIsOpen !== undefined
                  ? "bottom right"
                  : position.includes("bottom")
                    ? "bottom right"
                    : "top right",
              border: "1px solid rgba(255, 255, 255, 0.1)",
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
            <div
              className="flex-1 p-4 bg-background overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
              style={{
                height:
                  propIsOpen !== undefined
                    ? "calc(480px - 140px)"
                    : "calc(600px - 140px)",
                minHeight:
                  propIsOpen !== undefined
                    ? "calc(480px - 140px)"
                    : "calc(600px - 140px)",
                maxHeight:
                  propIsOpen !== undefined
                    ? "calc(480px - 140px)"
                    : "calc(600px - 140px)",
              }}
            >
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
                <motion.div
                  className="flex items-center gap-3 text-muted-foreground text-sm mb-4 p-3 bg-muted/20 rounded-lg border"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 bg-primary/70 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
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
                  <span className="text-xs font-medium">
                    {botName} is typing...
                  </span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t p-4 bg-background">
              <div className="flex gap-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    startDemo
                      ? "Demo mode - watch the conversation!"
                      : placeholder
                  }
                  className={`resize-none min-h-[50px] max-h-[100px] text-sm transition-all duration-200 focus:ring-2 focus:ring-primary/20 ${startDemo ? "bg-muted/50 cursor-not-allowed" : ""}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={startDemo}
                  readOnly={startDemo}
                />
                <Button
                  onClick={handleSendMessage}
                  className="self-end transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                  }}
                  disabled={!inputValue.trim() || startDemo}
                  size="sm"
                >
                  <Send size={16} />
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
