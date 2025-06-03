"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import {
  Zap,
  Brain,
  Settings,
  TestTube,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIProvider {
  id: string;
  name: string;
  description: string;
  models: string[];
  status: "connected" | "disconnected" | "error";
  apiKeyRequired: boolean;
}

const aiProviders: AIProvider[] = [
  {
    id: "gemini",
    name: "Google Gemini",
    description: "Advanced multimodal AI with strong reasoning capabilities",
    models: ["gemini-pro", "gemini-pro-vision", "gemini-ultra"],
    status: "connected",
    apiKeyRequired: true,
  },
  {
    id: "openai",
    name: "OpenAI",
    description: "GPT models for natural language understanding",
    models: ["gpt-4", "gpt-4-turbo", "gpt-3.5-turbo"],
    status: "disconnected",
    apiKeyRequired: true,
  },
  {
    id: "anthropic",
    name: "Anthropic Claude",
    description: "Constitutional AI with strong safety features",
    models: ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"],
    status: "disconnected",
    apiKeyRequired: true,
  },
  {
    id: "mistral",
    name: "Mistral AI",
    description: "Efficient and powerful open-source models",
    models: ["mistral-large", "mistral-medium", "mistral-small"],
    status: "error",
    apiKeyRequired: true,
  },
];

interface AIConfig {
  primaryProvider: string;
  primaryModel: string;
  fallbackProvider: string;
  fallbackModel: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  systemPrompt: string;
  useKnowledgeBase: boolean;
  enableStreaming: boolean;
  enableFallback: boolean;
  responseTimeout: number;
}

const defaultConfig: AIConfig = {
  primaryProvider: "gemini",
  primaryModel: "gemini-pro",
  fallbackProvider: "openai",
  fallbackModel: "gpt-3.5-turbo",
  temperature: 0.7,
  maxTokens: 1024,
  topP: 0.9,
  frequencyPenalty: 0,
  presencePenalty: 0,
  systemPrompt:
    "You are a helpful customer support assistant. You are friendly, concise, and accurate. You help customers with their questions about products, orders, and services. If you don't know the answer, you politely say so and offer to connect them with a human agent.",
  useKnowledgeBase: true,
  enableStreaming: true,
  enableFallback: true,
  responseTimeout: 30,
};

function ProviderCard({
  provider,
  isSelected,
  onSelect,
  onConfigure,
}: {
  provider: AIProvider;
  isSelected: boolean;
  onSelect: () => void;
  onConfigure: () => void;
}) {
  const getStatusColor = (status: AIProvider["status"]) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "disconnected":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
    }
  };

  const getStatusIcon = (status: AIProvider["status"]) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-3 w-3" />;
      case "disconnected":
        return <AlertCircle className="h-3 w-3" />;
      case "error":
        return <AlertCircle className="h-3 w-3" />;
    }
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all",
        isSelected && "ring-2 ring-primary",
        "hover:shadow-md",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{provider.name}</CardTitle>
          <Badge
            variant="secondary"
            className={getStatusColor(provider.status)}
          >
            {getStatusIcon(provider.status)}
            <span className="ml-1 capitalize">{provider.status}</span>
          </Badge>
        </div>
        <CardDescription>{provider.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-1">Available Models:</p>
            <div className="flex flex-wrap gap-1">
              {provider.models.map((model) => (
                <Badge key={model} variant="outline" className="text-xs">
                  {model}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={onSelect}
              className="flex-1"
            >
              {isSelected ? "Selected" : "Select"}
            </Button>
            <Button variant="ghost" size="sm" onClick={onConfigure}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ModelTester({ config }: { config: AIConfig }) {
  const [testPrompt, setTestPrompt] = useState(
    "Hello, can you help me with my order?",
  );
  const [testResponse, setTestResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const runTest = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setTestResponse(
        "Hello! I'd be happy to help you with your order. Could you please provide your order number so I can look up the details for you?",
      );
      toast({
        title: "Test Successful",
        description: "AI model responded successfully",
      });
    } catch (error) {
      toast({
        title: "Test Failed",
        description: "Failed to get response from AI model",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TestTube className="h-5 w-5" />
          <span>Model Tester</span>
        </CardTitle>
        <CardDescription>
          Test your AI configuration with sample prompts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="testPrompt">Test Prompt</Label>
          <Textarea
            id="testPrompt"
            value={testPrompt}
            onChange={(e) => setTestPrompt(e.target.value)}
            placeholder="Enter a test message..."
            rows={3}
          />
        </div>

        <Button onClick={runTest} disabled={isLoading} className="w-full">
          {isLoading ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <TestTube className="h-4 w-4 mr-2" />
          )}
          {isLoading ? "Testing..." : "Run Test"}
        </Button>

        {testResponse && (
          <div className="space-y-2">
            <Label>AI Response</Label>
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border">
              <p className="text-sm">{testResponse}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function AIConfigSection() {
  const [config, setConfig] = useState<AIConfig>(defaultConfig);
  const [selectedProvider, setSelectedProvider] = useState("gemini");
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const updateConfig = (key: keyof AIConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const saveConfig = () => {
    toast({
      title: "Configuration Saved",
      description: "AI configuration has been updated successfully.",
    });
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    toast({
      title: "Configuration Reset",
      description: "AI configuration has been reset to defaults.",
    });
  };

  const selectedProviderData = aiProviders.find(
    (p) => p.id === selectedProvider,
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            <Brain className="h-3 w-3 mr-1" />
            AI Configuration
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={resetConfig}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={saveConfig}>
            <Save className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
        </div>
      </div>

      <Tabs defaultValue="providers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="prompts">Prompts</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {aiProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                isSelected={selectedProvider === provider.id}
                onSelect={() => setSelectedProvider(provider.id)}
                onConfigure={() => {}}
              />
            ))}
          </div>

          {selectedProviderData && (
            <Card>
              <CardHeader>
                <CardTitle>Configure {selectedProviderData.name}</CardTitle>
                <CardDescription>
                  Set up API credentials and connection settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedProviderData.apiKeyRequired && (
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="apiKey"
                        type={showApiKey ? "text" : "password"}
                        value={apiKeys[selectedProvider] || ""}
                        onChange={(e) =>
                          setApiKeys((prev) => ({
                            ...prev,
                            [selectedProvider]: e.target.value,
                          }))
                        }
                        placeholder="Enter your API key"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your API key is encrypted and stored securely
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable as Primary Provider</Label>
                    <p className="text-sm text-muted-foreground">
                      Use this provider for all AI requests
                    </p>
                  </div>
                  <Switch
                    checked={config.primaryProvider === selectedProvider}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateConfig("primaryProvider", selectedProvider);
                      }
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable as Fallback</Label>
                    <p className="text-sm text-muted-foreground">
                      Use when primary provider fails
                    </p>
                  </div>
                  <Switch
                    checked={config.fallbackProvider === selectedProvider}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateConfig("fallbackProvider", selectedProvider);
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Primary Model</CardTitle>
                <CardDescription>
                  Main AI model for processing requests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Provider</Label>
                  <Select
                    value={config.primaryProvider}
                    onValueChange={(value) =>
                      updateConfig("primaryProvider", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {aiProviders.map((provider) => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Model</Label>
                  <Select
                    value={config.primaryModel}
                    onValueChange={(value) =>
                      updateConfig("primaryModel", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {aiProviders
                        .find((p) => p.id === config.primaryProvider)
                        ?.models.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fallback Model</CardTitle>
                <CardDescription>
                  Backup model when primary fails
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label>Enable Fallback</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically switch on failure
                    </p>
                  </div>
                  <Switch
                    checked={config.enableFallback}
                    onCheckedChange={(checked) =>
                      updateConfig("enableFallback", checked)
                    }
                  />
                </div>

                {config.enableFallback && (
                  <>
                    <div className="space-y-2">
                      <Label>Provider</Label>
                      <Select
                        value={config.fallbackProvider}
                        onValueChange={(value) =>
                          updateConfig("fallbackProvider", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {aiProviders
                            .filter((p) => p.id !== config.primaryProvider)
                            .map((provider) => (
                              <SelectItem key={provider.id} value={provider.id}>
                                {provider.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Model</Label>
                      <Select
                        value={config.fallbackModel}
                        onValueChange={(value) =>
                          updateConfig("fallbackModel", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {aiProviders
                            .find((p) => p.id === config.fallbackProvider)
                            ?.models.map((model) => (
                              <SelectItem key={model} value={model}>
                                {model}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Model Parameters */}
          <Card>
            <CardHeader>
              <CardTitle>Model Parameters</CardTitle>
              <CardDescription>
                Fine-tune AI behavior and response characteristics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Temperature</Label>
                    <span className="text-sm text-muted-foreground">
                      {config.temperature}
                    </span>
                  </div>
                  <Slider
                    value={[config.temperature]}
                    onValueChange={([value]) =>
                      updateConfig("temperature", value)
                    }
                    max={2}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Controls randomness. Lower = more focused, Higher = more
                    creative
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Max Tokens</Label>
                    <span className="text-sm text-muted-foreground">
                      {config.maxTokens}
                    </span>
                  </div>
                  <Slider
                    value={[config.maxTokens]}
                    onValueChange={([value]) =>
                      updateConfig("maxTokens", value)
                    }
                    max={4096}
                    min={256}
                    step={256}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum length of AI responses
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Top P</Label>
                    <span className="text-sm text-muted-foreground">
                      {config.topP}
                    </span>
                  </div>
                  <Slider
                    value={[config.topP]}
                    onValueChange={([value]) => updateConfig("topP", value)}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Controls diversity via nucleus sampling
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Response Timeout (seconds)</Label>
                    <span className="text-sm text-muted-foreground">
                      {config.responseTimeout}
                    </span>
                  </div>
                  <Slider
                    value={[config.responseTimeout]}
                    onValueChange={([value]) =>
                      updateConfig("responseTimeout", value)
                    }
                    max={60}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum time to wait for AI response
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Use Knowledge Base</Label>
                    <p className="text-sm text-muted-foreground">
                      Include relevant documents in AI context
                    </p>
                  </div>
                  <Switch
                    checked={config.useKnowledgeBase}
                    onCheckedChange={(checked) =>
                      updateConfig("useKnowledgeBase", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Streaming</Label>
                    <p className="text-sm text-muted-foreground">
                      Stream responses in real-time
                    </p>
                  </div>
                  <Switch
                    checked={config.enableStreaming}
                    onCheckedChange={(checked) =>
                      updateConfig("enableStreaming", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Prompt</CardTitle>
              <CardDescription>
                Define the AI's behavior, personality, and instructions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={config.systemPrompt}
                  onChange={(e) => updateConfig("systemPrompt", e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                  placeholder="Enter your system prompt..."
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{config.systemPrompt.length} characters</span>
                  <span>
                    ~{Math.ceil(config.systemPrompt.length / 4)} tokens
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prompt Templates</CardTitle>
              <CardDescription>
                Pre-defined prompts for common scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button
                  variant="outline"
                  className="h-auto p-4 text-left"
                  onClick={() =>
                    updateConfig(
                      "systemPrompt",
                      "You are a helpful customer support assistant. You are friendly, concise, and accurate. You help customers with their questions about products, orders, and services. If you don't know the answer, you politely say so and offer to connect them with a human agent.",
                    )
                  }
                >
                  <div>
                    <div className="font-medium">Customer Support</div>
                    <div className="text-sm text-muted-foreground">
                      Friendly support assistant
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 text-left"
                  onClick={() =>
                    updateConfig(
                      "systemPrompt",
                      "You are a knowledgeable sales assistant. You help customers understand products, compare options, and make informed purchasing decisions. You are enthusiastic but not pushy, and always prioritize the customer's needs.",
                    )
                  }
                >
                  <div>
                    <div className="font-medium">Sales Assistant</div>
                    <div className="text-sm text-muted-foreground">
                      Product-focused sales help
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 text-left"
                  onClick={() =>
                    updateConfig(
                      "systemPrompt",
                      "You are a technical support specialist. You help users troubleshoot issues, provide step-by-step instructions, and explain technical concepts in simple terms. You are patient and thorough in your explanations.",
                    )
                  }
                >
                  <div>
                    <div className="font-medium">Technical Support</div>
                    <div className="text-sm text-muted-foreground">
                      Technical troubleshooting
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 text-left"
                  onClick={() =>
                    updateConfig(
                      "systemPrompt",
                      "You are a general-purpose AI assistant. You are helpful, harmless, and honest. You can assist with a wide range of topics while being clear about your limitations. You always strive to provide accurate and useful information.",
                    )
                  }
                >
                  <div>
                    <div className="font-medium">General Assistant</div>
                    <div className="text-sm text-muted-foreground">
                      Multi-purpose helper
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <ModelTester config={config} />

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Monitor AI model performance and usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">1.2s</div>
                  <div className="text-sm text-muted-foreground">
                    Avg Response Time
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">98.5%</div>
                  <div className="text-sm text-muted-foreground">
                    Success Rate
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">2,847</div>
                  <div className="text-sm text-muted-foreground">
                    Total Requests
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
