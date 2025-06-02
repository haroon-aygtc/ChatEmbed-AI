"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { MessageCircle, User, Bot, ChevronRight } from "lucide-react";

export interface ChatMessageProps {
  id?: string;
  content: string;
  type: "user" | "ai";
  timestamp?: string | Date;
  isLoading?: boolean;
  followUpSuggestions?: string[];
  richContent?: {
    type: "link" | "image" | "code" | "list";
    content: any;
  }[];
  onFollowUpClick?: (suggestion: string) => void;
}

const ChatMessage = ({
  id = "msg-" + Math.random().toString(36).substring(2, 9),
  content = "",
  type = "ai",
  timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
  isLoading = false,
  followUpSuggestions = [],
  richContent = [],
  onFollowUpClick = () => {},
}: ChatMessageProps) => {
  // Format timestamp to string if it's a Date object
  const formattedTimestamp =
    timestamp instanceof Date
      ? timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : timestamp;
  const isUser = type === "user";

  // Format code blocks if they exist in the content
  const formatContent = (text: string) => {
    // Simple regex to detect code blocks with ```
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`} className="whitespace-pre-wrap">
            {text.substring(lastIndex, match.index)}
          </span>,
        );
      }

      // Add code block
      parts.push(
        <pre
          key={`code-${match.index}`}
          className="bg-muted p-3 rounded-md my-2 overflow-x-auto"
        >
          <code>{match[1]}</code>
        </pre>,
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-${lastIndex}`} className="whitespace-pre-wrap">
          {text.substring(lastIndex)}
        </span>,
      );
    }

    return parts.length > 0 ? (
      parts
    ) : (
      <span className="whitespace-pre-wrap">{text}</span>
    );
  };

  const renderRichContent = () => {
    if (!richContent || richContent.length === 0) return null;

    return (
      <div className="mt-2 space-y-2">
        {richContent.map((item, index) => {
          switch (item.type) {
            case "link":
              return (
                <a
                  key={`link-${index}`}
                  href={item.content.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline flex items-center gap-1"
                >
                  {item.content.text || item.content.url}
                  <ChevronRight className="h-3 w-3" />
                </a>
              );
            case "image":
              return (
                <div
                  key={`image-${index}`}
                  className="rounded-md overflow-hidden"
                >
                  <img
                    src={item.content.url}
                    alt={item.content.alt || "Image"}
                    className="max-w-full h-auto"
                  />
                </div>
              );
            case "code":
              return (
                <pre
                  key={`code-${index}`}
                  className="bg-muted p-3 rounded-md overflow-x-auto"
                >
                  <code>{item.content.code}</code>
                </pre>
              );
            case "list":
              return (
                <ul key={`list-${index}`} className="list-disc pl-5 space-y-1">
                  {item.content.items.map((listItem: string, i: number) => (
                    <li key={`list-item-${i}`}>{listItem}</li>
                  ))}
                </ul>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };

  return (
    <div
      id={id}
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "flex gap-3 max-w-[85%]",
          isUser ? "flex-row-reverse" : "flex-row",
        )}
      >
        {/* Avatar */}
        <Avatar
          className={cn("h-8 w-8", isUser ? "bg-primary" : "bg-secondary")}
        >
          <AvatarFallback>
            {isUser ? (
              <User className="h-4 w-4 text-primary-foreground" />
            ) : (
              <Bot className="h-4 w-4 text-secondary-foreground" />
            )}
          </AvatarFallback>
        </Avatar>

        {/* Message Content */}
        <div className="flex flex-col">
          <Card
            className={cn(
              "p-3 shadow-sm",
              isUser ? "bg-primary text-primary-foreground" : "bg-card",
            )}
          >
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            ) : (
              <div>
                <div className="message-content">{formatContent(content)}</div>
                {renderRichContent()}
              </div>
            )}
          </Card>

          {/* Timestamp */}
          <span
            className={cn(
              "text-xs text-muted-foreground mt-1",
              isUser ? "text-right" : "text-left",
            )}
          >
            {formattedTimestamp}
          </span>

          {/* Follow-up Suggestions */}
          {!isUser && followUpSuggestions && followUpSuggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {followUpSuggestions.map((suggestion, index) => (
                <Button
                  key={`suggestion-${index}`}
                  variant="outline"
                  size="sm"
                  className="text-xs py-1 h-auto"
                  onClick={() => onFollowUpClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
