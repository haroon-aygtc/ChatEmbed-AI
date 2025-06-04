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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Save,
  Play,
  ArrowRight,
  MessageSquare,
  Settings,
  Zap,
  GitBranch,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FlowNode {
  id: string;
  type: "trigger" | "condition" | "response" | "action";
  title: string;
  content: string;
  position: { x: number; y: number };
  connections: string[];
}

interface PromptFlow {
  id: string;
  name: string;
  description: string;
  nodes: FlowNode[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const sampleFlows: PromptFlow[] = [
  {
    id: "1",
    name: "Customer Support Flow",
    description: "Standard customer support conversation flow",
    nodes: [
      {
        id: "start",
        type: "trigger",
        title: "User Message",
        content: "When user sends a message",
        position: { x: 100, y: 100 },
        connections: ["classify"],
      },
      {
        id: "classify",
        type: "condition",
        title: "Classify Intent",
        content: "Determine if question is about: orders, products, or general",
        position: { x: 300, y: 100 },
        connections: ["order-response", "product-response", "general-response"],
      },
      {
        id: "order-response",
        type: "response",
        title: "Order Support",
        content:
          "I can help you with your order. Please provide your order number.",
        position: { x: 200, y: 250 },
        connections: [],
      },
      {
        id: "product-response",
        type: "response",
        title: "Product Info",
        content:
          "I'd be happy to help with product information. What would you like to know?",
        position: { x: 400, y: 250 },
        connections: [],
      },
      {
        id: "general-response",
        type: "response",
        title: "General Support",
        content: "How can I assist you today?",
        position: { x: 600, y: 250 },
        connections: [],
      },
    ],
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "2",
    name: "Sales Qualification Flow",
    description: "Lead qualification and sales process",
    nodes: [],
    isActive: false,
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
  },
];

function FlowCard({
  flow,
  onEdit,
  onDelete,
  onToggle,
}: {
  flow: PromptFlow;
  onEdit: (flow: PromptFlow) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md",
        flow.isActive && "ring-2 ring-primary",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-lg">{flow.name}</CardTitle>
            {flow.isActive && (
              <Badge variant="default" className="text-xs">
                Active
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit(flow)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(flow.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>{flow.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Nodes:</span>
            <span className="font-medium">{flow.nodes.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last updated:</span>
            <span className="font-medium">
              {new Date(flow.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                checked={flow.isActive}
                onCheckedChange={() => onToggle(flow.id)}
              />
              <Label className="text-sm">Active</Label>
            </div>
            <Button variant="outline" size="sm" onClick={() => onEdit(flow)}>
              <Play className="h-4 w-4 mr-1" />
              Edit Flow
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FlowBuilder({
  flow,
  onSave,
  onCancel,
}: {
  flow: PromptFlow | null;
  onSave: (flow: PromptFlow) => void;
  onCancel: () => void;
}) {
  const [editingFlow, setEditingFlow] = useState<PromptFlow>(
    flow || {
      id: Date.now().toString(),
      name: "New Flow",
      description: "",
      nodes: [],
      isActive: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  );

  const nodeTypes = [
    {
      value: "trigger",
      label: "Trigger",
      icon: Zap,
      color: "bg-green-100 text-green-800",
    },
    {
      value: "condition",
      label: "Condition",
      icon: GitBranch,
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "response",
      label: "Response",
      icon: MessageSquare,
      color: "bg-purple-100 text-purple-800",
    },
    {
      value: "action",
      label: "Action",
      icon: Settings,
      color: "bg-orange-100 text-orange-800",
    },
  ];

  const addNode = (type: FlowNode["type"]) => {
    const newNode: FlowNode = {
      id: Date.now().toString(),
      type,
      title: `New ${type}`,
      content: "",
      position: {
        x: 100 + editingFlow.nodes.length * 50,
        y: 100 + editingFlow.nodes.length * 50,
      },
      connections: [],
    };
    setEditingFlow((prev) => ({
      ...prev,
      nodes: [...prev.nodes, newNode],
    }));
  };

  const updateNode = (nodeId: string, updates: Partial<FlowNode>) => {
    setEditingFlow((prev) => ({
      ...prev,
      nodes: prev.nodes.map((node) =>
        node.id === nodeId ? { ...node, ...updates } : node,
      ),
    }));
  };

  const deleteNode = (nodeId: string) => {
    setEditingFlow((prev) => ({
      ...prev,
      nodes: prev.nodes.filter((node) => node.id !== nodeId),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Flow Builder</h3>
          <p className="text-sm text-muted-foreground">
            Design conversation flows and conditional responses
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(editingFlow)}>
            <Save className="h-4 w-4 mr-2" />
            Save Flow
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Flow Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Flow Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="flowName">Flow Name</Label>
              <Input
                id="flowName"
                value={editingFlow.name}
                onChange={(e) =>
                  setEditingFlow((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="flowDescription">Description</Label>
              <Textarea
                id="flowDescription"
                value={editingFlow.description}
                onChange={(e) =>
                  setEditingFlow((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={editingFlow.isActive}
                onCheckedChange={(checked) =>
                  setEditingFlow((prev) => ({ ...prev, isActive: checked }))
                }
              />
              <Label>Active Flow</Label>
            </div>
          </CardContent>
        </Card>

        {/* Node Palette */}
        <Card>
          <CardHeader>
            <CardTitle>Add Nodes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {nodeTypes.map((nodeType) => {
              const Icon = nodeType.icon;
              return (
                <Button
                  key={nodeType.value}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addNode(nodeType.value as FlowNode["type"])}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  Add {nodeType.label}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Visual Flow Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Visual Flow Editor</CardTitle>
            <CardDescription>
              Drag and connect nodes to build your conversation flow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] border rounded-lg">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                connectionMode={ConnectionMode.Loose}
                fitView
              >
                <Background />
                <Controls />
                <MiniMap />
              </ReactFlow>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Node Properties Panel */}
      {selectedNode && (
        <Card>
          <CardHeader>
            <CardTitle>Node Properties</CardTitle>
            <CardDescription>
              Configure the selected node
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Node Title</Label>
              <Input
                value={selectedNode.title}
                onChange={(e) =>
                  updateNode(selectedNode.id, { title: e.target.value })
                }
                placeholder="Node title"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Node Type</Label>
              <Select
                value={selectedNode.type}
                onValueChange={(value) =>
                  updateNode(selectedNode.id, { type: value as AgentNode['type'] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {nodeTypes.map((nodeType) => (
                    <SelectItem key={nodeType.value} value={nodeType.value}>
                      {nodeType.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={selectedNode.content}
                onChange={(e) =>
                  updateNode(selectedNode.id, { content: e.target.value })
                }
                placeholder="Node content or configuration"
                rows={4}
              />
            </div>
            
            {selectedNode.type === 'condition' && (
              <div className="space-y-2">
                <Label>Condition Logic</Label>
      </div>
    </div>
  );
}

export function PromptFlowSection() {
  const [flows, setFlows] = useState<PromptFlow[]>(sampleFlows);
  const [editingFlow, setEditingFlow] = useState<PromptFlow | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateFlow = () => {
    setEditingFlow(null);
    setIsBuilderOpen(true);
  };

  const handleEditFlow = (flow: PromptFlow) => {
    setEditingFlow(flow);
    setIsBuilderOpen(true);
  };

  const handleSaveFlow = (flow: PromptFlow) => {
    if (editingFlow) {
      setFlows((prev) =>
        prev.map((f) =>
          f.id === flow.id
            ? { ...flow, updatedAt: new Date().toISOString() }
            : f,
        ),
      );
    } else {
      setFlows((prev) => [...prev, flow]);
    }
    setIsBuilderOpen(false);
    setEditingFlow(null);
    toast({
      title: "Flow Saved",
      description: "Your prompt flow has been saved successfully.",
    });
  };

  const handleDeleteFlow = (id: string) => {
    setFlows((prev) => prev.filter((f) => f.id !== id));
    toast({
      title: "Flow Deleted",
      description: "The prompt flow has been deleted.",
    });
  };

  const handleToggleFlow = (id: string) => {
    setFlows((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isActive: !f.isActive } : f)),
    );
  };

  if (isBuilderOpen) {
    return (
      <FlowBuilder
        flow={editingFlow}
        onSave={handleSaveFlow}
        onCancel={() => {
          setIsBuilderOpen(false);
          setEditingFlow(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="outline" className="mb-2">
            <FileText className="h-3 w-3 mr-1" />
            Prompt Flow Editor
          </Badge>
        </div>
        <Button onClick={handleCreateFlow}>
          <Plus className="h-4 w-4 mr-2" />
          Create Flow
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{flows.length}</div>
            <p className="text-sm text-muted-foreground">Total Flows</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {flows.filter((f) => f.isActive).length}
            </div>
            <p className="text-sm text-muted-foreground">Active Flows</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {flows.reduce((acc, f) => acc + f.nodes.length, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Nodes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Flows Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {flows.map((flow) => (
          <FlowCard
            key={flow.id}
            flow={flow}
            onEdit={handleEditFlow}
            onDelete={handleDeleteFlow}
            onToggle={handleToggleFlow}
          />
        ))}
      </div>

      {flows.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Prompt Flows</h3>
            <p className="text-muted-foreground mb-4">
              Create your first prompt flow to design conversation logic
            </p>
            <Button onClick={handleCreateFlow}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Flow
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
