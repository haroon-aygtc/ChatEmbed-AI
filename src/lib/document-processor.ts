import { Document } from "@langchain/core/documents";
import * as pdfParse from "pdf-parse";
import * as mammoth from "mammoth";
import * as cheerio from "cheerio";

export interface ProcessedDocument {
  content: string;
  metadata: {
    title: string;
    type: string;
    size: number;
    pages?: number;
    wordCount: number;
    extractedAt: string;
    [key: string]: any;
  };
}

export class DocumentProcessor {
  async processFile(file: File): Promise<ProcessedDocument> {
    const fileType = this.getFileType(file.name);
    let content = "";
    let metadata: any = {
      title: file.name,
      type: fileType,
      size: file.size,
      extractedAt: new Date().toISOString(),
    };

    try {
      switch (fileType) {
        case "pdf":
          const result = await this.processPDF(file);
          content = result.content;
          metadata.pages = result.pages;
          break;
        case "docx":
          content = await this.processDOCX(file);
          break;
        case "txt":
          content = await this.processText(file);
          break;
        case "html":
          content = await this.processHTML(file);
          break;
        case "md":
          content = await this.processMarkdown(file);
          break;
        default:
          throw new Error(`Unsupported file type: ${fileType}`);
      }

      metadata.wordCount = this.countWords(content);

      return {
        content: content.trim(),
        metadata,
      };
    } catch (error) {
      console.error("Error processing file:", error);
      throw new Error(`Failed to process ${file.name}: ${error.message}`);
    }
  }

  async processURL(url: string): Promise<ProcessedDocument> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type") || "";
      const content = await response.text();

      let processedContent = "";
      let title = url;

      if (contentType.includes("text/html")) {
        const $ = cheerio.load(content);
        title = $("title").text() || url;

        // Remove script and style elements
        $("script, style, nav, footer, aside").remove();

        // Extract main content
        const mainContent = $("main, article, .content, #content").first();
        if (mainContent.length > 0) {
          processedContent = mainContent.text();
        } else {
          processedContent = $("body").text();
        }
      } else {
        processedContent = content;
      }

      // Clean up whitespace
      processedContent = processedContent.replace(/\s+/g, " ").trim();

      return {
        content: processedContent,
        metadata: {
          title,
          type: "url",
          size: content.length,
          wordCount: this.countWords(processedContent),
          url,
          contentType,
          extractedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error("Error processing URL:", error);
      throw new Error(`Failed to process URL ${url}: ${error.message}`);
    }
  }

  private async processPDF(
    file: File,
  ): Promise<{ content: string; pages: number }> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const data = await pdfParse(buffer);

    return {
      content: data.text,
      pages: data.numpages,
    };
  }

  private async processDOCX(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  private async processText(file: File): Promise<string> {
    return await file.text();
  }

  private async processHTML(file: File): Promise<string> {
    const htmlContent = await file.text();
    const $ = cheerio.load(htmlContent);

    // Remove script and style elements
    $("script, style").remove();

    // Extract text content
    return $("body").text() || $.text();
  }

  private async processMarkdown(file: File): Promise<string> {
    const mdContent = await file.text();

    // Simple markdown to text conversion
    // Remove markdown syntax
    return mdContent
      .replace(/#{1,6}\s+/g, "") // Headers
      .replace(/\*\*(.*?)\*\*/g, "$1") // Bold
      .replace(/\*(.*?)\*/g, "$1") // Italic
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Links
      .replace(/`([^`]+)`/g, "$1") // Inline code
      .replace(/```[\s\S]*?```/g, "") // Code blocks
      .replace(/^\s*[-*+]\s+/gm, "") // List items
      .replace(/^\s*\d+\.\s+/gm, "") // Numbered lists
      .trim();
  }

  private getFileType(filename: string): string {
    const extension = filename.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return "pdf";
      case "docx":
      case "doc":
        return "docx";
      case "txt":
        return "txt";
      case "html":
      case "htm":
        return "html";
      case "md":
      case "markdown":
        return "md";
      default:
        return "unknown";
    }
  }

  private countWords(text: string): number {
    return text.split(/\s+/).filter((word) => word.length > 0).length;
  }

  // Batch processing
  async processMultipleFiles(files: File[]): Promise<ProcessedDocument[]> {
    const results = [];
    const errors = [];

    for (const file of files) {
      try {
        const processed = await this.processFile(file);
        results.push(processed);
      } catch (error) {
        errors.push({ file: file.name, error: error.message });
      }
    }

    if (errors.length > 0) {
      console.warn("Some files failed to process:", errors);
    }

    return results;
  }

  // Convert to Langchain documents
  toLangchainDocuments(processedDocs: ProcessedDocument[]): Document[] {
    return processedDocs.map(
      (doc) =>
        new Document({
          pageContent: doc.content,
          metadata: doc.metadata,
        }),
    );
  }

  // Text chunking for large documents
  chunkText(
    text: string,
    chunkSize: number = 1000,
    overlap: number = 200,
  ): string[] {
    const chunks = [];
    let start = 0;

    while (start < text.length) {
      const end = Math.min(start + chunkSize, text.length);
      let chunk = text.slice(start, end);

      // Try to break at sentence boundaries
      if (end < text.length) {
        const lastSentence = chunk.lastIndexOf(".");
        const lastNewline = chunk.lastIndexOf("\n");
        const breakPoint = Math.max(lastSentence, lastNewline);

        if (breakPoint > start + chunkSize * 0.5) {
          chunk = chunk.slice(0, breakPoint + 1);
        }
      }

      chunks.push(chunk.trim());
      start = Math.max(start + chunkSize - overlap, start + chunk.length);
    }

    return chunks.filter((chunk) => chunk.length > 0);
  }
}

export const documentProcessor = new DocumentProcessor();
