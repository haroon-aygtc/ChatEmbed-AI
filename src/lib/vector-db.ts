import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// Vector Database Configuration
export class VectorDatabase {
  private pinecone: Pinecone;
  private embeddings: OpenAIEmbeddings;
  private textSplitter: RecursiveCharacterTextSplitter;

  constructor() {
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || "",
    });

    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY || "",
      modelName: "text-embedding-3-small",
    });

    this.textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
  }

  async initializeIndex(indexName: string, dimension: number = 1536) {
    try {
      const existingIndexes = await this.pinecone.listIndexes();
      const indexExists = existingIndexes.indexes?.some(
        (index) => index.name === indexName,
      );

      if (!indexExists) {
        await this.pinecone.createIndex({
          name: indexName,
          dimension,
          metric: "cosine",
          spec: {
            serverless: {
              cloud: "aws",
              region: "us-east-1",
            },
          },
        });
      }

      return this.pinecone.index(indexName);
    } catch (error) {
      console.error("Error initializing Pinecone index:", error);
      throw error;
    }
  }

  async addDocuments(
    indexName: string,
    documents: Document[],
    tenantId: string,
  ) {
    try {
      const index = await this.initializeIndex(indexName);
      const vectorStore = await PineconeStore.fromExistingIndex(
        this.embeddings,
        {
          pineconeIndex: index,
          namespace: tenantId, // Use tenant ID as namespace for multi-tenancy
        },
      );

      // Split documents into chunks
      const splitDocs = await this.textSplitter.splitDocuments(documents);

      // Add metadata for tenant isolation
      const docsWithMetadata = splitDocs.map((doc) => ({
        ...doc,
        metadata: {
          ...doc.metadata,
          tenantId,
          timestamp: new Date().toISOString(),
        },
      }));

      await vectorStore.addDocuments(docsWithMetadata);
      return { success: true, documentsAdded: docsWithMetadata.length };
    } catch (error) {
      console.error("Error adding documents to vector store:", error);
      throw error;
    }
  }

  async similaritySearch(
    indexName: string,
    query: string,
    tenantId: string,
    k: number = 5,
    filter?: Record<string, any>,
  ) {
    try {
      const index = await this.initializeIndex(indexName);
      const vectorStore = await PineconeStore.fromExistingIndex(
        this.embeddings,
        {
          pineconeIndex: index,
          namespace: tenantId,
        },
      );

      const searchFilter = {
        tenantId: { $eq: tenantId },
        ...filter,
      };

      const results = await vectorStore.similaritySearch(
        query,
        k,
        searchFilter,
      );
      return results;
    } catch (error) {
      console.error("Error performing similarity search:", error);
      throw error;
    }
  }

  async deleteDocuments(
    indexName: string,
    tenantId: string,
    documentIds?: string[],
  ) {
    try {
      const index = await this.initializeIndex(indexName);

      if (documentIds && documentIds.length > 0) {
        await index.namespace(tenantId).deleteMany(documentIds);
      } else {
        // Delete all documents for tenant
        await index.namespace(tenantId).deleteAll();
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting documents:", error);
      throw error;
    }
  }

  async getStats(indexName: string, tenantId: string) {
    try {
      const index = await this.initializeIndex(indexName);
      const stats = await index.describeIndexStats();

      return {
        totalVectors: stats.totalVectorCount || 0,
        namespaces: stats.namespaces || {},
        tenantVectors: stats.namespaces?.[tenantId]?.vectorCount || 0,
      };
    } catch (error) {
      console.error("Error getting index stats:", error);
      throw error;
    }
  }
}

export const vectorDB = new VectorDatabase();
