"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertCircle,
  BarChart3,
  Book,
  ChevronRight,
  Code,
  Cog,
  FileText,
  Globe,
  HelpCircle,
  Layout,
  MessageSquare,
  Plus,
  Settings,
  Upload,
  Users,
} from "lucide-react";

interface AdminDashboardProps {
  initialTab?: string;
}

export default function AdminDashboard({
  initialTab = "overview",
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [widgetColor, setWidgetColor] = useState("#3b82f6");
  const [widgetPosition, setWidgetPosition] = useState("bottom-right");
  const [selectedModel, setSelectedModel] = useState("gemini-pro");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Chat Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                alt="Admin"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex flex-1 container px-4 py-6">
        <aside className="w-56 mr-8 hidden md:block">
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <Layout className="h-4 w-4 mr-2" />
              Overview
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab("widget")}
            >
              <Code className="h-4 w-4 mr-2" />
              Widget Config
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab("ai-models")}
            >
              <Settings className="h-4 w-4 mr-2" />
              AI Models
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab("knowledge-base")}
            >
              <Book className="h-4 w-4 mr-2" />
              Knowledge Base
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab("prompt-flow")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Prompt Flow
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab("analytics")}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab("settings")}
            >
              <Cog className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </nav>
        </aside>

        <main className="flex-1">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="md:hidden mb-4">
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-1">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="widget" className="flex-1">
                  Widget
                </TabsTrigger>
                <TabsTrigger value="ai-models" className="flex-1">
                  AI
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex-1">
                  Analytics
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Dashboard Overview</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Widget
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Conversations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,248</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Response Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1.8s</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      -0.3s from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      User Satisfaction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">94%</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +2% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Conversations</CardTitle>
                  <CardDescription>
                    Your latest chat interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {[
                        {
                          id: 1,
                          user: "John Doe",
                          message: "How do I reset my password?",
                          time: "2 mins ago",
                          status: "resolved",
                        },
                        {
                          id: 2,
                          user: "Sarah Smith",
                          message: "What are your business hours?",
                          time: "15 mins ago",
                          status: "resolved",
                        },
                        {
                          id: 3,
                          user: "Michael Brown",
                          message: "Do you offer international shipping?",
                          time: "1 hour ago",
                          status: "resolved",
                        },
                        {
                          id: 4,
                          user: "Emily Johnson",
                          message: "I need help with my recent order #45678",
                          time: "3 hours ago",
                          status: "pending",
                        },
                        {
                          id: 5,
                          user: "David Wilson",
                          message: "How long does delivery take?",
                          time: "5 hours ago",
                          status: "resolved",
                        },
                      ].map((conversation) => (
                        <div
                          key={conversation.id}
                          className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${conversation.user}`}
                              alt={conversation.user}
                            />
                            <AvatarFallback>
                              {conversation.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{conversation.user}</p>
                              <span className="text-xs text-muted-foreground">
                                {conversation.time}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {conversation.message}
                            </p>
                          </div>
                          <Badge
                            variant={
                              conversation.status === "resolved"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {conversation.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="widget" className="space-y-4">
              <h2 className="text-2xl font-bold">Widget Configuration</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Customize how your chat widget looks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="widget-color">Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full border"
                          style={{ backgroundColor: widgetColor }}
                        />
                        <Input
                          id="widget-color"
                          type="text"
                          value={widgetColor}
                          onChange={(e) => setWidgetColor(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="widget-position">Widget Position</Label>
                      <Select
                        value={widgetPosition}
                        onValueChange={setWidgetPosition}
                      >
                        <SelectTrigger id="widget-position">
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bottom-right">
                            Bottom Right
                          </SelectItem>
                          <SelectItem value="bottom-left">
                            Bottom Left
                          </SelectItem>
                          <SelectItem value="top-right">Top Right</SelectItem>
                          <SelectItem value="top-left">Top Left</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="widget-title">Widget Title</Label>
                      <Input id="widget-title" placeholder="Chat with us" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="welcome-message">Welcome Message</Label>
                      <Textarea
                        id="welcome-message"
                        placeholder="Hello! How can I help you today?"
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-avatar">Show Agent Avatar</Label>
                      <Switch id="show-avatar" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-open">Auto-open on Page Load</Label>
                      <Switch id="auto-open" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>
                      See how your widget will appear
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg h-[400px] relative bg-background">
                      <div className="absolute bottom-4 right-4">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                          style={{ backgroundColor: widgetColor }}
                        >
                          <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                      </div>

                      <div className="absolute bottom-20 right-4 w-80 rounded-lg shadow-lg border bg-card overflow-hidden">
                        <div
                          className="p-3 border-b"
                          style={{ backgroundColor: widgetColor }}
                        >
                          <h3 className="font-medium text-white">
                            Chat with us
                          </h3>
                        </div>
                        <div className="p-4 h-[300px] flex flex-col">
                          <div className="flex-1 space-y-4">
                            <div className="flex items-start gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=agent"
                                  alt="Agent"
                                />
                                <AvatarFallback>AI</AvatarFallback>
                              </Avatar>
                              <div className="bg-accent p-3 rounded-lg text-sm">
                                Hello! How can I help you today?
                              </div>
                            </div>

                            <div className="flex items-start gap-2 justify-end">
                              <div className="bg-primary p-3 rounded-lg text-sm text-primary-foreground">
                                I need help with my order
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=agent"
                                  alt="Agent"
                                />
                                <AvatarFallback>AI</AvatarFallback>
                              </Avatar>
                              <div className="bg-accent p-3 rounded-lg text-sm">
                                I'd be happy to help with your order. Could you
                                please provide your order number?
                              </div>
                            </div>
                          </div>

                          <div className="border-t mt-4 pt-4">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Type your message..."
                                className="flex-1"
                              />
                              <Button
                                size="icon"
                                style={{ backgroundColor: widgetColor }}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Installation</CardTitle>
                    <CardDescription>
                      Add the widget to your website
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-accent/50 p-4 rounded-md">
                      <code className="text-sm">
                        {`<script src="https://cdn.example.com/chat-widget.js" data-widget-id="${Math.random().toString(36).substring(2, 10)}"></script>`}
                      </code>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Copy and paste this code snippet just before the closing
                      &lt;/body&gt; tag on your website.
                    </p>
                    <Button variant="outline" className="mt-4">
                      Copy Code
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ai-models" className="space-y-4">
              <h2 className="text-2xl font-bold">AI Model Configuration</h2>

              <Card>
                <CardHeader>
                  <CardTitle>Select AI Provider</CardTitle>
                  <CardDescription>
                    Choose and configure your AI model
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="ai-provider">AI Provider</Label>
                    <Select defaultValue="gemini">
                      <SelectTrigger id="ai-provider">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gemini">Google Gemini</SelectItem>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic</SelectItem>
                        <SelectItem value="mistral">Mistral AI</SelectItem>
                        <SelectItem value="huggingface">
                          Hugging Face
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model-selection">Model</Label>
                    <Select
                      value={selectedModel}
                      onValueChange={setSelectedModel}
                    >
                      <SelectTrigger id="model-selection">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                        <SelectItem value="gemini-ultra">
                          Gemini Ultra
                        </SelectItem>
                        <SelectItem value="gemini-flash">
                          Gemini Flash
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Enter your API key"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Model Parameters</h3>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="temperature">Temperature: 0.7</Label>
                        <span className="text-xs text-muted-foreground">
                          Controls randomness
                        </span>
                      </div>
                      <Input
                        id="temperature"
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        defaultValue="0.7"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="max-tokens">Max Tokens: 1024</Label>
                        <span className="text-xs text-muted-foreground">
                          Maximum response length
                        </span>
                      </div>
                      <Input
                        id="max-tokens"
                        type="range"
                        min="256"
                        max="4096"
                        step="256"
                        defaultValue="1024"
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="use-kb">Use Knowledge Base</Label>
                      <Switch id="use-kb" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="stream-response">Stream Response</Label>
                      <Switch id="stream-response" defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Prompt</CardTitle>
                  <CardDescription>
                    Define the AI's behavior and personality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="min-h-[200px]"
                    placeholder="You are a helpful customer support assistant for [Company Name]. You are friendly, concise, and accurate. You help customers with their questions about products, orders, and services. If you don't know the answer, you politely say so and offer to connect them with a human agent."
                    defaultValue="You are a helpful customer support assistant for ACME Inc. You are friendly, concise, and accurate. You help customers with their questions about products, orders, and services. If you don't know the answer, you politely say so and offer to connect them with a human agent."
                  />
                  <div className="flex justify-end mt-4">
                    <Button>Save System Prompt</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="knowledge-base" className="space-y-4">
              <h2 className="text-2xl font-bold">Knowledge Base Management</h2>

              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>
                      Manage your knowledge base documents
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Search documents..."
                          className="flex-1"
                        />
                        <Button>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      </div>

                      <ScrollArea className="h-[400px]">
                        <div className="space-y-2">
                          {[
                            {
                              id: 1,
                              title: "Product Catalog.pdf",
                              size: "2.4 MB",
                              date: "2023-05-15",
                              status: "processed",
                            },
                            {
                              id: 2,
                              title: "Return Policy.docx",
                              size: "0.8 MB",
                              date: "2023-06-22",
                              status: "processed",
                            },
                            {
                              id: 3,
                              title: "FAQ.md",
                              size: "0.3 MB",
                              date: "2023-07-10",
                              status: "processed",
                            },
                            {
                              id: 4,
                              title: "Shipping Information.pdf",
                              size: "1.2 MB",
                              date: "2023-08-05",
                              status: "processed",
                            },
                            {
                              id: 5,
                              title: "Terms of Service.pdf",
                              size: "3.1 MB",
                              date: "2023-09-18",
                              status: "processing",
                            },
                            {
                              id: 6,
                              title: "Product Manual.pdf",
                              size: "5.7 MB",
                              date: "2023-10-03",
                              status: "processed",
                            },
                            {
                              id: 7,
                              title: "Troubleshooting Guide.docx",
                              size: "1.5 MB",
                              date: "2023-11-12",
                              status: "processed",
                            },
                          ].map((doc) => (
                            <div
                              key={doc.id}
                              className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{doc.title}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {doc.size} • {doc.date}
                                  </p>
                                </div>
                              </div>
                              <Badge
                                variant={
                                  doc.status === "processed"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {doc.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Knowledge Base Stats</CardTitle>
                    <CardDescription>
                      Current status and metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          Storage Used
                        </span>
                        <span className="text-sm text-muted-foreground">
                          15.1 MB / 100 MB
                        </span>
                      </div>
                      <Progress value={15} />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Total Documents</span>
                        <span className="font-medium">7</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Indexed Pages</span>
                        <span className="font-medium">42</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Last Updated</span>
                        <span className="font-medium">Today, 10:23 AM</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button variant="outline" className="w-full">
                        <Globe className="h-4 w-4 mr-2" />
                        Add Website URL
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="prompt-flow" className="space-y-4">
              <h2 className="text-2xl font-bold">Prompt Flow Editor</h2>

              <Card>
                <CardHeader>
                  <CardTitle>Visual Prompt Flow</CardTitle>
                  <CardDescription>
                    Design conversation flows and conditional responses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-6 h-[500px] bg-accent/20 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="font-medium text-lg">
                        Prompt Flow Editor
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        The visual prompt flow editor allows you to create
                        complex conversation flows with conditional branching
                        and dynamic responses.
                      </p>
                      <Button>Create New Flow</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Flows</CardTitle>
                    <CardDescription>
                      Your existing prompt flows
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2">
                        {[
                          {
                            id: 1,
                            name: "Customer Support Flow",
                            updated: "2 days ago",
                            nodes: 8,
                          },
                          {
                            id: 2,
                            name: "Product Recommendation",
                            updated: "1 week ago",
                            nodes: 12,
                          },
                          {
                            id: 3,
                            name: "Order Tracking",
                            updated: "2 weeks ago",
                            nodes: 6,
                          },
                          {
                            id: 4,
                            name: "Account Creation",
                            updated: "1 month ago",
                            nodes: 5,
                          },
                        ].map((flow) => (
                          <div
                            key={flow.id}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent"
                          >
                            <div>
                              <p className="font-medium">{flow.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Updated {flow.updated} • {flow.nodes} nodes
                              </p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Templates</CardTitle>
                    <CardDescription>
                      Start with pre-built prompt flows
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2">
                        {[
                          {
                            id: 1,
                            name: "Basic Customer Support",
                            complexity: "Simple",
                            category: "Support",
                          },
                          {
                            id: 2,
                            name: "E-commerce Assistant",
                            complexity: "Advanced",
                            category: "Sales",
                          },
                          {
                            id: 3,
                            name: "FAQ Bot",
                            complexity: "Simple",
                            category: "Information",
                          },
                          {
                            id: 4,
                            name: "Lead Generation",
                            complexity: "Medium",
                            category: "Marketing",
                          },
                          {
                            id: 5,
                            name: "Appointment Booking",
                            complexity: "Medium",
                            category: "Scheduling",
                          },
                        ].map((template) => (
                          <div
                            key={template.id}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent"
                          >
                            <div>
                              <p className="font-medium">{template.name}</p>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {template.complexity}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {template.category}
                                </Badge>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Use
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <h2 className="text-2xl font-bold">Analytics & Insights</h2>

              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      User Engagement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">78%</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +5% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Avg. Session Duration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4:32</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +0:45 from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Resolution Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">92%</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +3% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Conversation Analytics</CardTitle>
                  <CardDescription>Chat performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-accent/20 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Analytics visualization would appear here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Questions</CardTitle>
                    <CardDescription>
                      Most frequently asked questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-4">
                        {[
                          {
                            id: 1,
                            question: "How do I track my order?",
                            count: 156,
                          },
                          {
                            id: 2,
                            question: "What is your return policy?",
                            count: 124,
                          },
                          {
                            id: 3,
                            question: "Do you ship internationally?",
                            count: 98,
                          },
                          {
                            id: 4,
                            question: "How long does shipping take?",
                            count: 87,
                          },
                          {
                            id: 5,
                            question: "How do I reset my password?",
                            count: 72,
                          },
                        ].map((item, index) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-muted-foreground">
                                {index + 1}.
                              </span>
                              <span className="text-sm">{item.question}</span>
                            </div>
                            <Badge variant="secondary">{item.count}</Badge>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>User Feedback</CardTitle>
                    <CardDescription>
                      Recent ratings and comments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-4">
                        {[
                          {
                            id: 1,
                            rating: 5,
                            comment: "Very helpful and quick responses!",
                            date: "Today",
                          },
                          {
                            id: 2,
                            rating: 4,
                            comment: "Answered my question accurately.",
                            date: "Yesterday",
                          },
                          {
                            id: 3,
                            rating: 5,
                            comment: "Saved me a lot of time, thank you!",
                            date: "2 days ago",
                          },
                          {
                            id: 4,
                            rating: 3,
                            comment:
                              "Helpful but took a few tries to understand my question.",
                            date: "3 days ago",
                          },
                          {
                            id: 5,
                            rating: 5,
                            comment: "Excellent service, very impressed!",
                            date: "1 week ago",
                          },
                        ].map((feedback) => (
                          <div key={feedback.id} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {Array(5)
                                  .fill(0)
                                  .map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`h-4 w-4 ${i < feedback.rating ? "text-yellow-400" : "text-muted-foreground/30"}`}
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  ))}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {feedback.date}
                              </span>
                            </div>
                            <p className="text-sm">"{feedback.comment}"</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <h2 className="text-2xl font-bold">Settings</h2>

              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Configure your chat widget settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-chat">Enable Chat Widget</Label>
                      <p className="text-sm text-muted-foreground">
                        Turn the chat widget on or off
                      </p>
                    </div>
                    <Switch id="enable-chat" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="save-history">Save Chat History</Label>
                      <p className="text-sm text-muted-foreground">
                        Store conversation history in database
                      </p>
                    </div>
                    <Switch id="save-history" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="collect-feedback">
                        Collect User Feedback
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Ask users to rate their experience
                      </p>
                    </div>
                    <Switch id="collect-feedback" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="human-handoff">
                        Enable Human Handoff
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Allow transferring to human agents
                      </p>
                    </div>
                    <Switch id="human-handoff" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Manage access to the admin dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Button>
                        <Users className="h-4 w-4 mr-2" />
                        Invite Team Member
                      </Button>
                    </div>

                    <ScrollArea className="h-[200px]">
                      <div className="space-y-4">
                        {[
                          {
                            id: 1,
                            name: "John Smith",
                            email: "john@example.com",
                            role: "Admin",
                          },
                          {
                            id: 2,
                            name: "Sarah Johnson",
                            email: "sarah@example.com",
                            role: "Editor",
                          },
                          {
                            id: 3,
                            name: "Michael Brown",
                            email: "michael@example.com",
                            role: "Viewer",
                          },
                        ].map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                                  alt={member.name}
                                />
                                <AvatarFallback>
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {member.email}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{member.role}</Badge>
                              <Button variant="ghost" size="sm">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
}
