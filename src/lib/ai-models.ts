import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Anthropic from "@anthropic-ai/sdk";
import MistralClient from "@mistralai/mistralai";

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason?: string;
}

export interface AIModelConfig {
  provider: "openai" | "gemini" | "anthropic" | "mistral";
  model: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

export class AIModelManager {
  private openai: OpenAI;
  private gemini: GoogleGenerativeAI;
  private anthropic: Anthropic;
  private mistral: MistralClient;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "",
    });

    this.gemini = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || "",
    });

    this.mistral = new MistralClient(process.env.MISTRAL_API_KEY || "");
  }

  async generateResponse(
    messages: AIMessage[],
    config: AIModelConfig,
    context?: string,
  ): Promise<AIResponse> {
    try {
      // Add context to system message if provided
      const enhancedMessages = context
        ? [
            {
              role: "system" as const,
              content: `${messages[0]?.content || ""}

Relevant context from knowledge base:
${context}

Use this context to provide accurate and helpful responses. If the context doesn't contain relevant information, rely on your general knowledge but mention that you're providing general information.`,
            },
            ...messages.slice(1),
          ]
        : messages;

      switch (config.provider) {
        case "openai":
          return await this.generateOpenAIResponse(enhancedMessages, config);
        case "gemini":
          return await this.generateGeminiResponse(enhancedMessages, config);
        case "anthropic":
          return await this.generateAnthropicResponse(enhancedMessages, config);
        case "mistral":
          return await this.generateMistralResponse(enhancedMessages, config);
        default:
          throw new Error(`Unsupported AI provider: ${config.provider}`);
      }
    } catch (error) {
      console.error("Error generating AI response:", error);
      throw error;
    }
  }

  private async generateOpenAIResponse(
    messages: AIMessage[],
    config: AIModelConfig,
  ): Promise<AIResponse> {
    const response = await this.openai.chat.completions.create({
      model: config.model,
      messages: messages as any,
      temperature: config.temperature || 0.7,
      max_tokens: config.maxTokens || 1024,
      top_p: config.topP || 1,
      frequency_penalty: config.frequencyPenalty || 0,
      presence_penalty: config.presencePenalty || 0,
    });

    return {
      content: response.choices[0]?.message?.content || "",
      model: config.model,
      usage: {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      },
      finishReason: response.choices[0]?.finish_reason || "stop",
    };
  }

  private async generateGeminiResponse(
    messages: AIMessage[],
    config: AIModelConfig,
  ): Promise<AIResponse> {
    const model = this.gemini.getGenerativeModel({ model: config.model });

    // Convert messages to Gemini format
    const systemMessage = messages.find((m) => m.role === "system");
    const conversationMessages = messages.filter((m) => m.role !== "system");

    const chat = model.startChat({
      generationConfig: {
        temperature: config.temperature || 0.7,
        maxOutputTokens: config.maxTokens || 1024,
        topP: config.topP || 1,
      },
      history: conversationMessages.slice(0, -1).map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    });

    const lastMessage = conversationMessages[conversationMessages.length - 1];
    const prompt = systemMessage
      ? `${systemMessage.content}\n\nUser: ${lastMessage.content}`
      : lastMessage.content;

    const result = await chat.sendMessage(prompt);
    const response = await result.response;

    return {
      content: response.text(),
      model: config.model,
      usage: {
        promptTokens: response.usageMetadata?.promptTokenCount || 0,
        completionTokens: response.usageMetadata?.candidatesTokenCount || 0,
        totalTokens: response.usageMetadata?.totalTokenCount || 0,
      },
      finishReason: "stop",
    };
  }

  private async generateAnthropicResponse(
    messages: AIMessage[],
    config: AIModelConfig,
  ): Promise<AIResponse> {
    const systemMessage = messages.find((m) => m.role === "system");
    const conversationMessages = messages.filter((m) => m.role !== "system");

    const response = await this.anthropic.messages.create({
      model: config.model,
      max_tokens: config.maxTokens || 1024,
      temperature: config.temperature || 0.7,
      system: systemMessage?.content,
      messages: conversationMessages as any,
    });

    return {
      content:
        response.content[0]?.type === "text" ? response.content[0].text : "",
      model: config.model,
      usage: {
        promptTokens: response.usage.input_tokens,
        completionTokens: response.usage.output_tokens,
        totalTokens: response.usage.input_tokens + response.usage.output_tokens,
      },
      finishReason: response.stop_reason || "stop",
    };
  }

  private async generateMistralResponse(
    messages: AIMessage[],
    config: AIModelConfig,
  ): Promise<AIResponse> {
    const response = await this.mistral.chat({
      model: config.model,
      messages: messages as any,
      temperature: config.temperature || 0.7,
      maxTokens: config.maxTokens || 1024,
      topP: config.topP || 1,
    });

    return {
      content: response.choices[0]?.message?.content || "",
      model: config.model,
      usage: {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      },
      finishReason: response.choices[0]?.finish_reason || "stop",
    };
  }

  async testConnection(provider: string, apiKey: string): Promise<boolean> {
    try {
      switch (provider) {
        case "openai": {
          const client = new OpenAI({ apiKey });
          await client.models.list();
          return true;
        }
        case "gemini": {
          const client = new GoogleGenerativeAI(apiKey);
          const model = client.getGenerativeModel({ model: "gemini-pro" });
          await model.generateContent("test");
          return true;
        }
        case "anthropic": {
          const client = new Anthropic({ apiKey });
          await client.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 10,
            messages: [{ role: "user", content: "test" }],
          });
          return true;
        }
        case "mistral": {
          const client = new MistralClient(apiKey);
          await client.listModels();
          return true;
        }
        default:
          return false;
      }
    } catch (error) {
      console.error(`Error testing ${provider} connection:`, error);
      return false;
    }
  }
}

export const aiModelManager = new AIModelManager();
