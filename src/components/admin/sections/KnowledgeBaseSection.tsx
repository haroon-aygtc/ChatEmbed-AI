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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Book,
  FileText,
  Globe,
  Plus,
  Search,
  Upload,
  Download,
  RefreshCw,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  MoreHorizontal,
  Tag,
  Calendar,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Document {
  id: string;
  title: string;
  type: string;
  size: string;
  status: "indexed" | "processing" | "error";
  tags: string[];
  uploadedAt: string;
  wordCount?: number;
  lastModified?: string;
}

interface KnowledgeSource {
  id: string;
  name: string;
  type: "website" | "api" | "database";
  url: string;
  status: "active" | "syncing" | "error";
  lastSync: string;
  documentsCount: number;
}

const sampleDocuments: Document[] = [
  {
    id: "1",
    title: "Product Documentation",
    type: "PDF",
    size: "2.4 MB",
    status: "indexed",
    tags: ["product", "documentation", "setup"],
    uploadedAt: "2024-01-15",
    wordCount: 5420,
    lastModified: "2024-01-20",
  },
  {
    id: "2",
    title: "FAQ Collection",
    type: "MD",
    size: "156 KB",
    status: "indexed",
    tags: ["faq", "support", "common-issues"],
    uploadedAt: "2024-01-10",
    wordCount: 2100,
  },
  {
    id: "3",
    title: "API Reference",
    type: "HTML",
    size: "890 KB",
    status: "processing",
    tags: ["api", "reference", "technical"],
    uploadedAt: "2024-01-22",
    wordCount: 3200,
  },
  {
    id: "4",
    title: "User Guide",
    type: "DOCX",
    size: "1.8 MB",
    status: "error",
    tags: ["guide", "tutorial", "beginner"],
    uploadedAt: "2024-01-18",
    wordCount: 4800,
  },
];

const sampleSources: KnowledgeSource[] = [
  {
    id: "1",
    name: "Company Website",
    type: "website",
    url: "https://company.com",
    status: "active",
    lastSync: "2024-01-22 14:30",
    documentsCount: 45,
  },
  {
    id: "2",
    name: "Help Center API",
    type: "api",
    url: "https://api.helpdesk.com/v1",
    status: "syncing",
    lastSync: "2024-01-22 12:15",
    documentsCount: 128,
  },
  {
    id: "3",
    name: "Internal Wiki",
    type: "database",
    url: "postgresql://internal-wiki",
    status: "error",
    lastSync: "2024-01-21 09:45",
    documentsCount: 0,
  },
];

function DocumentCard({
  document,
  onView,
  onEdit,
  onDelete,
}: {
  document: Document;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "indexed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "indexed":
        return <CheckCircle className="h-3 w-3" />;
      case "processing":
        return <Clock className="h-3 w-3" />;
      case "error":
        return <AlertCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-background hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <h3 className="font-medium text-sm truncate">{document.title}</h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onView}>
                <Eye className="h-3 w-3 mr-2" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="h-3 w-3 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="h-3 w-3 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {document.type} • {document.size}
            </span>
            <Badge className={`text-xs ${getStatusColor(document.status)}`}>
              {getStatusIcon(document.status)}
              <span className="ml-1">{document.status}</span>
            </Badge>
          </div>

          {document.wordCount && (
            <div className="text-xs text-muted-foreground">
              {document.wordCount.toLocaleString()} words
            </div>
          )}

          <div className="flex flex-wrap gap-1">
            {document.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {document.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{document.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center text-xs text-muted-foreground pt-1">
            <Calendar className="h-3 w-3 mr-1" />
            {document.uploadedAt}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SourceCard({
  source,
  onEdit,
  onSync,
  onDelete,
}: {
  source: KnowledgeSource;
  onEdit: () => void;
  onSync: () => void;
  onDelete: () => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "syncing":
        return "bg-blue-100 text-blue-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "website":
        return <Globe className="h-4 w-4" />;
      case "api":
        return <RefreshCw className="h-4 w-4" />;
      case "database":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-background hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {getTypeIcon(source.type)}
            <h3 className="font-medium text-sm">{source.name}</h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onSync}>
                <RefreshCw className="h-3 w-3 mr-2" />
                Sync Now
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="h-3 w-3 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="h-3 w-3 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-muted-foreground truncate">
            {source.url}
          </div>

          <div className="flex items-center justify-between">
            <Badge className={`text-xs ${getStatusColor(source.status)}`}>
              {source.status}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {source.documentsCount} docs
            </span>
          </div>

          <div className="text-xs text-muted-foreground">
            Last sync: {source.lastSync}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FileUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    files.forEach((file) => {
      toast({
        title: "File Upload Started",
        description: `Uploading ${file.name}...`,
      });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Documents</CardTitle>
        <CardDescription>Add documents to your knowledge base</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Drop files here</h3>
          <p className="text-sm text-muted-foreground mb-4">
            or click to browse your computer
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Choose Files
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Supports PDF, TXT, MD, HTML, DOCX (max 50MB each)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function ProcessingQueue() {
  const processingItems = [
    { name: "User Manual.pdf", progress: 75, status: "Processing..." },
    { name: "API Docs.html", progress: 45, status: "Extracting text..." },
    { name: "FAQ.md", progress: 90, status: "Indexing..." },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Queue</CardTitle>
        <CardDescription>Documents being processed and indexed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {processingItems.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">{item.progress}%</span>
              </div>
              <Progress value={item.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">{item.status}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function KnowledgeSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = () => {
    // Simulate search results
    setSearchResults([
      {
        title: "Getting Started Guide",
        snippet:
          "Learn how to set up your account and configure basic settings...",
        relevance: 0.95,
        source: "user-guide.pdf",
      },
      {
        title: "API Authentication",
        snippet:
          "Use JWT tokens for secure API access. Generate tokens from...",
        relevance: 0.87,
        source: "api-docs.html",
      },
    ]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Search</CardTitle>
        <CardDescription>
          Test search functionality across your knowledge base
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <div className="flex-1">
            <Input
              placeholder="Search your knowledge base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Search Results</h4>
            {searchResults.map((result, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-sm">{result.title}</h5>
                  <Badge variant="outline" className="text-xs">
                    {Math.round(result.relevance * 100)}% match
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {result.snippet}
                </p>
                <p className="text-xs text-muted-foreground">
                  Source: {result.source}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function KnowledgeBaseSection() {
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments);
  const [sources, setSources] = useState<KnowledgeSource[]>(sampleSources);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("documents");
  const { toast } = useToast();

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => doc.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const allTags = Array.from(new Set(documents.flatMap((doc) => doc.tags)));
  const totalWords = documents.reduce(
    (acc, doc) => acc + (doc.wordCount || 0),
    0,
  );
  const indexedCount = documents.filter((d) => d.status === "indexed").length;
  const processingCount = documents.filter(
    (d) => d.status === "processing",
  ).length;
  const errorCount = documents.filter((d) => d.status === "error").length;

  const handleDocumentAction = (action: string, documentId: string) => {
    switch (action) {
      case "view":
        toast({
          title: "Viewing Document",
          description: "Document viewer opened",
        });
        break;
      case "edit":
        toast({
          title: "Editing Document",
          description: "Document editor opened",
        });
        break;
      case "delete":
        setDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
        toast({
          title: "Document Deleted",
          description: "Document removed from knowledge base",
        });
        break;
    }
  };

  const handleSourceAction = (action: string, sourceId: string) => {
    switch (action) {
      case "sync":
        toast({
          title: "Syncing Source",
          description: "Knowledge source sync started",
        });
        break;
      case "edit":
        toast({
          title: "Editing Source",
          description: "Source configuration opened",
        });
        break;
      case "delete":
        setSources((prev) => prev.filter((source) => source.id !== sourceId));
        toast({
          title: "Source Deleted",
          description: "Knowledge source removed",
        });
        break;
    }
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            <Book className="h-3 w-3 mr-1" />
            Knowledge Base
          </Badge>
          {processingCount > 0 && (
            <Badge variant="secondary">
              <Clock className="h-3 w-3 mr-1" />
              {processingCount} Processing
            </Badge>
          )}
          {errorCount > 0 && (
            <Badge variant="destructive">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errorCount} Errors
            </Badge>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Content
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-background">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{documents.length}</p>
                <p className="text-sm text-muted-foreground">Total Documents</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{indexedCount}</p>
                <p className="text-sm text-muted-foreground">Indexed & Ready</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{sources.length}</p>
                <p className="text-sm text-muted-foreground">
                  Knowledge Sources
                </p>
              </div>
              <Globe className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {totalWords.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Words</p>
              </div>
              <Book className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documents by title or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Label className="text-sm font-medium">Tags:</Label>
                  <div className="flex flex-wrap gap-1">
                    {allTags.slice(0, 5).map((tag) => (
                      <Badge
                        key={tag}
                        variant={
                          selectedTags.includes(tag) ? "default" : "outline"
                        }
                        className="cursor-pointer text-xs"
                        onClick={() => {
                          setSelectedTags((prev) =>
                            prev.includes(tag)
                              ? prev.filter((t) => t !== tag)
                              : [...prev, tag],
                          );
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                    {allTags.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{allTags.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {(searchQuery || selectedTags.length > 0) && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredDocuments.length} of {documents.length}{" "}
                    documents
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTags([]);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Documents Grid */}
          {filteredDocuments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  onView={() => handleDocumentAction("view", document.id)}
                  onEdit={() => handleDocumentAction("edit", document.id)}
                  onDelete={() => handleDocumentAction("delete", document.id)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No documents found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {searchQuery || selectedTags.length > 0
                    ? "No documents match your current search criteria. Try adjusting your filters or search terms."
                    : "Your knowledge base is empty. Upload your first document or connect a knowledge source to get started."}
                </p>
                <div className="flex justify-center space-x-2">
                  <Button onClick={() => setActiveTab("upload")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("sources")}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Add Source
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Knowledge Sources</h3>
              <p className="text-sm text-muted-foreground">
                Manage external sources that automatically sync content to your
                knowledge base
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Source
            </Button>
          </div>

          {sources.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sources.map((source) => (
                <SourceCard
                  key={source.id}
                  source={source}
                  onEdit={() => handleSourceAction("edit", source.id)}
                  onSync={() => handleSourceAction("sync", source.id)}
                  onDelete={() => handleSourceAction("delete", source.id)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Globe className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No knowledge sources
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Connect external sources like websites, APIs, or databases to
                  automatically keep your knowledge base up to date.
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Source
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <FileUploader />

              <Card>
                <CardHeader>
                  <CardTitle>Add Knowledge Source</CardTitle>
                  <CardDescription>
                    Connect external sources to automatically sync content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="sourceName">Source Name</Label>
                      <Input id="sourceName" placeholder="My Website" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sourceType">Source Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="api">API Endpoint</SelectItem>
                          <SelectItem value="database">Database</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sourceUrl">URL</Label>
                    <Input id="sourceUrl" placeholder="https://example.com" />
                  </div>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Source
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <ProcessingQueue />

              <Card>
                <CardHeader>
                  <CardTitle>Upload Guidelines</CardTitle>
                  <CardDescription>
                    Best practices for knowledge base content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Supported Formats</h4>
                    <div className="flex flex-wrap gap-1">
                      {["PDF", "TXT", "MD", "HTML", "DOCX"].map((format) => (
                        <Badge
                          key={format}
                          variant="outline"
                          className="text-xs"
                        >
                          {format}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">
                      Tips for Better Results
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Use clear, descriptive titles</li>
                      <li>• Add relevant tags for better organization</li>
                      <li>• Keep documents focused on specific topics</li>
                      <li>• Update content regularly for accuracy</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <KnowledgeSearch />

            <Card>
              <CardHeader>
                <CardTitle>Search Analytics</CardTitle>
                <CardDescription>
                  Insights into knowledge base usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Searches</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg. Results per Search</span>
                    <span className="font-medium">3.2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Most Searched Topic</span>
                    <Badge variant="outline">Product Setup</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Search Success Rate</span>
                    <span className="font-medium text-green-600">94.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Indexing Settings</CardTitle>
                <CardDescription>
                  Configure how documents are processed and indexed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-index new documents</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically process uploaded files
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable OCR for images</Label>
                    <p className="text-sm text-muted-foreground">
                      Extract text from images and PDFs
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Chunk large documents</Label>
                    <p className="text-sm text-muted-foreground">
                      Split large files for better search
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Maximum file size (MB)</Label>
                  <Input type="number" defaultValue="50" min="1" max="500" />
                </div>

                <div className="space-y-2">
                  <Label>Supported languages</Label>
                  <div className="flex flex-wrap gap-1">
                    {["English", "Spanish", "French", "German"].map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Search Configuration</CardTitle>
                <CardDescription>
                  Customize search behavior and relevance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Search similarity threshold</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">0.1</span>
                    <div className="flex-1">
                      <Progress value={75} />
                    </div>
                    <span className="text-sm text-muted-foreground">1.0</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Higher values return more precise results
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Maximum results per search</Label>
                  <Input type="number" defaultValue="10" min="1" max="50" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable fuzzy search</Label>
                    <p className="text-sm text-muted-foreground">
                      Match similar words and typos
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Boost recent content</Label>
                    <p className="text-sm text-muted-foreground">
                      Prioritize recently updated documents
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance Actions</CardTitle>
              <CardDescription>
                Manage your knowledge base health and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" className="h-auto p-4">
                  <div className="text-center">
                    <RefreshCw className="h-6 w-6 mx-auto mb-2" />
                    <div className="font-medium">Rebuild Index</div>
                    <div className="text-xs text-muted-foreground">
                      Refresh search index
                    </div>
                  </div>
                </Button>

                <Button variant="outline" className="h-auto p-4">
                  <div className="text-center">
                    <Download className="h-6 w-6 mx-auto mb-2" />
                    <div className="font-medium">Export Data</div>
                    <div className="text-xs text-muted-foreground">
                      Download all content
                    </div>
                  </div>
                </Button>

                <Button variant="outline" className="h-auto p-4">
                  <div className="text-center">
                    <Trash2 className="h-6 w-6 mx-auto mb-2" />
                    <div className="font-medium">Clear Cache</div>
                    <div className="text-xs text-muted-foreground">
                      Reset processing cache
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
