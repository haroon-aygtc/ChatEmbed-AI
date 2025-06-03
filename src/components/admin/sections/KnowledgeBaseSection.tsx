// Replace this 

           }}
        />
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

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => doc.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const allTags = Array.from(new Set(documents.flatMap(doc => doc.tags)));
  const totalWords = documents.reduce((acc, doc) => acc + (doc.wordCount || 0), 0);
  const indexedCount = documents.filter(d => d.status === 'indexed').length;
  const processingCount = documents.filter(d => d.status === 'processing').length;
  const errorCount = documents.filter(d => d.status === 'error').length;

  const handleDocumentAction = (action: string, documentId: string) => {
    switch (action) {
      case 'view':
        toast({ title: "Viewing Document", description: "Document viewer opened" });
        break;
      case 'edit':
        toast({ title: "Editing Document", description: "Document editor opened" });
        break;
      case 'delete':
        setDocuments(prev => prev.filter(doc => doc.id !== documentId));
        toast({ title: "Document Deleted", description: "Document removed from knowledge base" });
        break;
    }
  };

  const handleSourceAction = (action: string, sourceId: string) => {
    switch (action) {
      case 'sync':
        toast({ title: "Syncing Source", description: "Knowledge source sync started" });
        break;
      case 'edit':
        toast({ title: "Editing Source", description: "Source configuration opened" });
        break;
      case 'delete':
        setSources(prev => prev.filter(source => source.id !== sourceId));
        toast({ title: "Source Deleted", description: "Knowledge source removed" });
        break;
    }
  };

  const bulkActions = [
    { label: "Reindex Selected", action: "reindex", icon: RefreshCw },
    { label: "Delete Selected", action: "delete", icon: Trash2 },
    { label: "Export Selected", action: "export", icon: Download }
  ];

  return (
    <div className="space-y-6">
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
                <p className="text-sm text-muted-foreground">Knowledge Sources</p>
              </div>
              <Globe className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-background">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{totalWords.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Words</p>
              </div>
              <Book className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer text-xs"
                        onClick={() => {
                          setSelectedTags(prev => 
                            prev.includes(tag) 
                              ? prev.filter(t => t !== tag)
                              : [...prev, tag]
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
                    Showing {filteredDocuments.length} of {documents.length} documents
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
                  onView={() => handleDocumentAction('view', document.id)}
                  onEdit={() => handleDocumentAction('edit', document.id)}
                  onDelete={() => handleDocumentAction('delete', document.id)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No documents found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {searchQuery || selectedTags.length > 0 
                    ? "No documents match your current search criteria. Try adjusting your filters or search terms."
                    : "Your knowledge base is empty. Upload your first document or connect a knowledge source to get started."
                  }
                </p>
                <div className="flex justify-center space-x-2">
                  <Button onClick={() => setActiveTab("upload")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("sources")}>
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
                Manage external sources that automatically sync content to your knowledge base
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
                  onEdit={() => handleSourceAction('edit', source.id)}
                  onSync={() => handleSourceAction('sync', source.id)}
                  onDelete={() => handleSourceAction('delete', source.id)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Globe className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No knowledge sources</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Connect external sources like websites, APIs, or databases to automatically 
                  keep your knowledge base up to date.
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
                      {['PDF', 'TXT', 'MD', 'HTML', 'DOCX'].map(format => (
                        <Badge key={format} variant="outline" className="text-xs">
                          {format}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Tips for Better Results</h4>
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
                    <p className="text-sm text-muted-foreground">Automatically process uploaded files</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable OCR for images</Label>
                    <p className="text-sm text-muted-foreground">Extract text from images and PDFs</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Chunk large documents</Label>
                    <p className="text-sm text-muted-foreground">Split large files for better search</p>
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
                    {['English', 'Spanish', 'French', 'German'].map(lang => (
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
                  <p className="text-xs text-muted-foreground">Higher values return more precise results</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Maximum results per search</Label>
                  <Input type="number" defaultValue="10" min="1" max="50" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable fuzzy search</Label>
                    <p className="text-sm text-muted-foreground">Match similar words and typos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Boost recent content</Label>
                    <p className="text-sm text-muted-foreground">Prioritize recently updated documents</p>
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
                    <div className="text-xs text-muted-foreground">Refresh search index</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4">
                  <div className="text-center">
                    <Download className="h-6 w-6 mx-auto mb-2" />
                    <div className="font-medium">Export Data</div>
                    <div className="text-xs text-muted-foreground">Download all content</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4">
                  <div className="text-center">
                    <Trash2 className="h-6 w-6 mx-auto mb-2" />
                    <div className="font-medium">Clear Cache</div>
                    <div className="text-xs text-muted-foreground">Reset processing cache</div>
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