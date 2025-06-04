import { vectorDB } from "./vector-db";
import { aiModelManager, AIModelConfig, AIMessage } from "./ai-models";
import { Document } from "@langchain/core/documents";

export interface RAGConfig {
  indexName: string;
  tenantId: string;
  aiConfig: AIModelConfig;
  systemPrompt: string;
  contextWindow: number;
  similarityThreshold: number;
  maxContextLength: number;
}

export interface RAGResponse {
  answer: string;
  sources: Array<{
    content: string;
    metadata: Record<string, any>;
    score: number;
  }>;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export class RAGSystem {
  async query(
    query: string,
    config: RAGConfig,
    conversationHistory: AIMessage[] = [],
  ): Promise<RAGResponse> {
    try {
      // 1. Retrieve relevant documents from vector database
      const relevantDocs = await vectorDB.similaritySearch(
        config.indexName,
        query,
        config.tenantId,
        config.contextWindow,
      );

      // 2. Filter documents by similarity threshold
      const filteredDocs = relevantDocs.filter(
        (doc) => (doc as any).score >= config.similarityThreshold,
      );

      // 3. Prepare context from retrieved documents
      const context = this.prepareContext(
        filteredDocs,
        config.maxContextLength,
      );

      // 4. Build conversation with system prompt and context
      const messages: AIMessage[] = [
        {
          role: "system",
          content: config.systemPrompt,
        },
        ...conversationHistory,
        {
          role: "user",
          content: query,
        },
      ];

      // 5. Generate AI response with context
      const aiResponse = await aiModelManager.generateResponse(
        messages,
        config.aiConfig,
        context,
      );

      // 6. Return structured response
      return {
        answer: aiResponse.content,
        sources: filteredDocs.map((doc, index) => ({
          content: doc.pageContent,
          metadata: doc.metadata,
          score: (doc as any).score || 0,
        })),
        model: aiResponse.model,
        usage: aiResponse.usage,
      };
    } catch (error) {
      console.error("Error in RAG query:", error);
      throw error;
    }
  }

  private prepareContext(documents: Document[], maxLength: number): string {
    let context = "";
    let currentLength = 0;

    for (const doc of documents) {
      const docText = `Source: ${doc.metadata.title || "Unknown"}\n${doc.pageContent}\n\n`;

      if (currentLength + docText.length > maxLength) {
        break;
      }

      context += docText;
      currentLength += docText.length;
    }

    return context;
  }

  async addKnowledgeBase(
    documents: Array<{
      content: string;
      metadata: Record<string, any>;
    }>,
    config: { indexName: string; tenantId: string },
  ): Promise<{ success: boolean; documentsAdded: number }> {
    try {
      const langchainDocs = documents.map(
        (doc) =>
          new Document({
            pageContent: doc.content,
            metadata: doc.metadata,
          }),
      );

      const result = await vectorDB.addDocuments(
        config.indexName,
        langchainDocs,
        config.tenantId,
      );

      return result;
    } catch (error) {
      console.error("Error adding knowledge base:", error);
      throw error;
    }
  }

  async updateKnowledgeBase(
    documentId: string,
    content: string,
    metadata: Record<string, any>,
    config: { indexName: string; tenantId: string },
  ): Promise<{ success: boolean }> {
    try {
      // Delete old document
      await vectorDB.deleteDocuments(config.indexName, config.tenantId, [
        documentId,
      ]);

      // Add updated document
      await this.addKnowledgeBase(
        [{ content, metadata: { ...metadata, id: documentId } }],
        config,
      );

      return { success: true };
    } catch (error) {
      console.error("Error updating knowledge base:", error);
      throw error;
    }
  }

  async deleteFromKnowledgeBase(
    documentIds: string[],
    config: { indexName: string; tenantId: string },
  ): Promise<{ success: boolean }> {
    try {
      await vectorDB.deleteDocuments(
        config.indexName,
        config.tenantId,
        documentIds,
      );
      return { success: true };
    } catch (error) {
      console.error("Error deleting from knowledge base:", error);
      throw error;
    }
  }

  async searchKnowledgeBase(
    query: string,
    config: { indexName: string; tenantId: string },
    limit: number = 10,
  ): Promise<
    Array<{
      content: string;
      metadata: Record<string, any>;
      score: number;
    }>
  > {
    try {
      const results = await vectorDB.similaritySearch(
        config.indexName,
        query,
        config.tenantId,
        limit,
      );

      return results.map((doc) => ({
        content: doc.pageContent,
        metadata: doc.metadata,
        score: (doc as any).score || 0,
      }));
    } catch (error) {
      console.error("Error searching knowledge base:", error);
      throw error;
    }
  }

  async getKnowledgeBaseStats(config: {
    indexName: string;
    tenantId: string;
  }): Promise<{
    totalDocuments: number;
    tenantDocuments: number;
  }> {
    try {
      const stats = await vectorDB.getStats(config.indexName, config.tenantId);
      return {
        totalDocuments: stats.totalVectors,
        tenantDocuments: stats.tenantVectors,
      };
    } catch (error) {
      console.error("Error getting knowledge base stats:", error);
      throw error;
    }
  }
}

export const ragSystem = new RAGSystem();
