import { ragSystem, RAGConfig } from "./rag-system";
import { AIMessage } from "./ai-models";

export interface AgentNode {
  id: string;
  type:
    | "trigger"
    | "condition"
    | "response"
    | "action"
    | "rag_query"
    | "api_call";
  title: string;
  content: string;
  config?: Record<string, any>;
  connections: string[];
  position: { x: number; y: number };
}

export interface AgentFlow {
  id: string;
  name: string;
  description: string;
  nodes: AgentNode[];
  isActive: boolean;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentContext {
  userId: string;
  sessionId: string;
  tenantId: string;
  conversationHistory: AIMessage[];
  variables: Record<string, any>;
  metadata: Record<string, any>;
}

export interface AgentResponse {
  response: string;
  nextNodes: string[];
  variables: Record<string, any>;
  actions: Array<{
    type: string;
    data: any;
  }>;
  followUpSuggestions?: string[];
}

export class AgentSystem {
  private flows: Map<string, AgentFlow> = new Map();

  async executeFlow(
    flowId: string,
    userMessage: string,
    context: AgentContext,
    ragConfig?: RAGConfig,
  ): Promise<AgentResponse> {
    try {
      const flow = this.flows.get(flowId);
      if (!flow || !flow.isActive) {
        throw new Error(`Flow ${flowId} not found or inactive`);
      }

      // Find trigger node
      const triggerNode = flow.nodes.find((node) => node.type === "trigger");
      if (!triggerNode) {
        throw new Error("No trigger node found in flow");
      }

      // Execute flow starting from trigger
      return await this.executeNode(
        triggerNode,
        flow,
        userMessage,
        context,
        ragConfig,
      );
    } catch (error) {
      console.error("Error executing agent flow:", error);
      throw error;
    }
  }

  private async executeNode(
    node: AgentNode,
    flow: AgentFlow,
    userMessage: string,
    context: AgentContext,
    ragConfig?: RAGConfig,
  ): Promise<AgentResponse> {
    switch (node.type) {
      case "trigger":
        return await this.executeTriggerNode(
          node,
          flow,
          userMessage,
          context,
          ragConfig,
        );
      case "condition":
        return await this.executeConditionNode(
          node,
          flow,
          userMessage,
          context,
          ragConfig,
        );
      case "response":
        return await this.executeResponseNode(
          node,
          flow,
          userMessage,
          context,
          ragConfig,
        );
      case "rag_query":
        return await this.executeRAGNode(
          node,
          flow,
          userMessage,
          context,
          ragConfig,
        );
      case "action":
        return await this.executeActionNode(
          node,
          flow,
          userMessage,
          context,
          ragConfig,
        );
      case "api_call":
        return await this.executeAPICallNode(
          node,
          flow,
          userMessage,
          context,
          ragConfig,
        );
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }

  private async executeTriggerNode(
    node: AgentNode,
    flow: AgentFlow,
    userMessage: string,
    context: AgentContext,
    ragConfig?: RAGConfig,
  ): Promise<AgentResponse> {
    // Trigger nodes just pass through to connected nodes
    if (node.connections.length > 0) {
      const nextNode = flow.nodes.find((n) => n.id === node.connections[0]);
      if (nextNode) {
        return await this.executeNode(
          nextNode,
          flow,
          userMessage,
          context,
          ragConfig,
        );
      }
    }

    return {
      response: "Hello! How can I help you today?",
      nextNodes: [],
      variables: context.variables,
      actions: [],
    };
  }

  private async executeConditionNode(
    node: AgentNode,
    flow: AgentFlow,
    userMessage: string,
    context: AgentContext,
    ragConfig?: RAGConfig,
  ): Promise<AgentResponse> {
    // Parse condition logic from node content
    const conditions = this.parseConditions(node.content);

    // Evaluate conditions against user message and context
    const matchedCondition = this.evaluateConditions(
      conditions,
      userMessage,
      context,
    );

    if (matchedCondition && matchedCondition.nextNodeId) {
      const nextNode = flow.nodes.find(
        (n) => n.id === matchedCondition.nextNodeId,
      );
      if (nextNode) {
        return await this.executeNode(
          nextNode,
          flow,
          userMessage,
          context,
          ragConfig,
        );
      }
    }

    // Default fallback
    return {
      response:
        "I'm not sure how to help with that. Could you please rephrase your question?",
      nextNodes: [],
      variables: context.variables,
      actions: [],
    };
  }

  private async executeResponseNode(
    node: AgentNode,
    flow: AgentFlow,
    userMessage: string,
    context: AgentContext,
    ragConfig?: RAGConfig,
  ): Promise<AgentResponse> {
    // Replace variables in response template
    let response = this.replaceVariables(node.content, context.variables);

    // Extract follow-up suggestions if configured
    const followUpSuggestions = node.config?.followUpSuggestions || [];

    return {
      response,
      nextNodes: node.connections,
      variables: context.variables,
      actions: [],
      followUpSuggestions,
    };
  }

  private async executeRAGNode(
    node: AgentNode,
    flow: AgentFlow,
    userMessage: string,
    context: AgentContext,
    ragConfig?: RAGConfig,
  ): Promise<AgentResponse> {
    if (!ragConfig) {
      throw new Error("RAG configuration required for RAG node");
    }

    try {
      // Perform RAG query
      const ragResponse = await ragSystem.query(
        userMessage,
        ragConfig,
        context.conversationHistory,
      );

      // Store RAG results in context variables
      const updatedVariables = {
        ...context.variables,
        ragResponse: ragResponse.answer,
        ragSources: ragResponse.sources,
        ragModel: ragResponse.model,
      };

      // Continue to next node if configured
      if (node.connections.length > 0) {
        const nextNode = flow.nodes.find((n) => n.id === node.connections[0]);
        if (nextNode) {
          const updatedContext = { ...context, variables: updatedVariables };
          return await this.executeNode(
            nextNode,
            flow,
            userMessage,
            updatedContext,
            ragConfig,
          );
        }
      }

      return {
        response: ragResponse.answer,
        nextNodes: [],
        variables: updatedVariables,
        actions: [
          {
            type: "rag_query_completed",
            data: {
              sources: ragResponse.sources,
              model: ragResponse.model,
              usage: ragResponse.usage,
            },
          },
        ],
      };
    } catch (error) {
      console.error("Error in RAG node execution:", error);
      return {
        response:
          "I'm having trouble accessing my knowledge base right now. Please try again later.",
        nextNodes: [],
        variables: context.variables,
        actions: [
          {
            type: "error",
            data: { error: error.message },
          },
        ],
      };
    }
  }

  private async executeActionNode(
    node: AgentNode,
    flow: AgentFlow,
    userMessage: string,
    context: AgentContext,
    ragConfig?: RAGConfig,
  ): Promise<AgentResponse> {
    const actions = [];

    // Parse action configuration
    const actionConfig = node.config || {};

    // Execute different types of actions
    switch (actionConfig.actionType) {
      case "set_variable":
        context.variables[actionConfig.variableName] =
          actionConfig.variableValue;
        actions.push({
          type: "variable_set",
          data: {
            name: actionConfig.variableName,
            value: actionConfig.variableValue,
          },
        });
        break;

      case "send_email":
        actions.push({
          type: "send_email",
          data: {
            to: this.replaceVariables(actionConfig.emailTo, context.variables),
            subject: this.replaceVariables(
              actionConfig.emailSubject,
              context.variables,
            ),
            body: this.replaceVariables(
              actionConfig.emailBody,
              context.variables,
            ),
          },
        });
        break;

      case "create_ticket":
        actions.push({
          type: "create_ticket",
          data: {
            title: this.replaceVariables(
              actionConfig.ticketTitle,
              context.variables,
            ),
            description: this.replaceVariables(
              actionConfig.ticketDescription,
              context.variables,
            ),
            priority: actionConfig.ticketPriority || "medium",
          },
        });
        break;
    }

    // Continue to next node
    if (node.connections.length > 0) {
      const nextNode = flow.nodes.find((n) => n.id === node.connections[0]);
      if (nextNode) {
        const result = await this.executeNode(
          nextNode,
          flow,
          userMessage,
          context,
          ragConfig,
        );
        result.actions = [...actions, ...result.actions];
        return result;
      }
    }

    return {
      response: "Action completed successfully.",
      nextNodes: [],
      variables: context.variables,
      actions,
    };
  }

  private async executeAPICallNode(
    node: AgentNode,
    flow: AgentFlow,
    userMessage: string,
    context: AgentContext,
    ragConfig?: RAGConfig,
  ): Promise<AgentResponse> {
    const apiConfig = node.config || {};

    try {
      // Make API call
      const response = await fetch(apiConfig.url, {
        method: apiConfig.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...apiConfig.headers,
        },
        body:
          apiConfig.method !== "GET"
            ? JSON.stringify(apiConfig.body)
            : undefined,
      });

      const data = await response.json();

      // Store API response in variables
      context.variables.apiResponse = data;

      // Continue to next node
      if (node.connections.length > 0) {
        const nextNode = flow.nodes.find((n) => n.id === node.connections[0]);
        if (nextNode) {
          return await this.executeNode(
            nextNode,
            flow,
            userMessage,
            context,
            ragConfig,
          );
        }
      }

      return {
        response: "API call completed successfully.",
        nextNodes: [],
        variables: context.variables,
        actions: [
          {
            type: "api_call_completed",
            data: { response: data },
          },
        ],
      };
    } catch (error) {
      console.error("Error in API call node:", error);
      return {
        response:
          "There was an error processing your request. Please try again.",
        nextNodes: [],
        variables: context.variables,
        actions: [
          {
            type: "error",
            data: { error: error.message },
          },
        ],
      };
    }
  }

  private parseConditions(content: string): Array<{
    condition: string;
    nextNodeId: string;
  }> {
    // Parse condition syntax from content
    // Example: "if contains 'order' then node_id_1; if contains 'product' then node_id_2"
    const conditions = [];
    const lines = content.split(";");

    for (const line of lines) {
      const match = line.match(/if\s+(.+?)\s+then\s+(.+)/i);
      if (match) {
        conditions.push({
          condition: match[1].trim(),
          nextNodeId: match[2].trim(),
        });
      }
    }

    return conditions;
  }

  private evaluateConditions(
    conditions: Array<{ condition: string; nextNodeId: string }>,
    userMessage: string,
    context: AgentContext,
  ): { condition: string; nextNodeId: string } | null {
    for (const cond of conditions) {
      if (this.evaluateCondition(cond.condition, userMessage, context)) {
        return cond;
      }
    }
    return null;
  }

  private evaluateCondition(
    condition: string,
    userMessage: string,
    context: AgentContext,
  ): boolean {
    const lowerMessage = userMessage.toLowerCase();
    const lowerCondition = condition.toLowerCase();

    // Simple condition evaluation
    if (lowerCondition.includes("contains")) {
      const match = lowerCondition.match(/contains\s+['"](.+?)['"]/i);
      if (match) {
        return lowerMessage.includes(match[1]);
      }
    }

    if (lowerCondition.includes("equals")) {
      const match = lowerCondition.match(/equals\s+['"](.+?)['"]/i);
      if (match) {
        return lowerMessage === match[1];
      }
    }

    if (lowerCondition.includes("starts_with")) {
      const match = lowerCondition.match(/starts_with\s+['"](.+?)['"]/i);
      if (match) {
        return lowerMessage.startsWith(match[1]);
      }
    }

    return false;
  }

  private replaceVariables(
    template: string,
    variables: Record<string, any>,
  ): string {
    let result = template;

    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      result = result.replace(regex, String(value));
    }

    return result;
  }

  // Flow management methods
  registerFlow(flow: AgentFlow): void {
    this.flows.set(flow.id, flow);
  }

  getFlow(flowId: string): AgentFlow | undefined {
    return this.flows.get(flowId);
  }

  updateFlow(flowId: string, updates: Partial<AgentFlow>): void {
    const flow = this.flows.get(flowId);
    if (flow) {
      this.flows.set(flowId, {
        ...flow,
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  deleteFlow(flowId: string): void {
    this.flows.delete(flowId);
  }

  listFlows(tenantId: string): AgentFlow[] {
    return Array.from(this.flows.values()).filter(
      (flow) => flow.tenantId === tenantId,
    );
  }
}

export const agentSystem = new AgentSystem();
