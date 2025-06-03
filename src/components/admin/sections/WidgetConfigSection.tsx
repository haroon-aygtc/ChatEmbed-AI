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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import {
  MessageSquare,
  Palette,
  Settings,
  Code,
  Eye,
  Copy,
  Save,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WidgetConfig {
  appearance: {
    primaryColor: string;
    position: string;
    size: string;
    borderRadius: string;
    showAvatar: boolean;
    showBranding: boolean;
  };
  behavior: {
    autoOpen: boolean;
    autoOpenDelay: number;
    welcomeMessage: string;
    placeholderText: string;
    enableTypingIndicator: boolean;
    enableSoundNotifications: boolean;
  };
  branding: {
    title: string;
    subtitle: string;
    logoUrl: string;
    companyName: string;
  };
}

const defaultConfig: WidgetConfig = {
  appearance: {
    primaryColor: "#3b82f6",
    position: "bottom-right",
    size: "medium",
    borderRadius: "12",
    showAvatar: true,
    showBranding: false,
  },
  behavior: {
    autoOpen: false,
    autoOpenDelay: 3,
    welcomeMessage: "Hello! How can I help you today?",
    placeholderText: "Type your message...",
    enableTypingIndicator: true,
    enableSoundNotifications: false,
  },
  branding: {
    title: "Chat with us",
    subtitle: "We're here to help",
    logoUrl: "",
    companyName: "ChatWidget",
  },
};

function WidgetPreview({ config }: { config: WidgetConfig }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="relative h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden border">
      {/* Mock website background */}
      <div className="absolute inset-0 p-6">
        <div className="h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border p-6">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
          </div>
        </div>
      </div>

      {/* Widget */}
      <div
        className={cn(
          "absolute",
          config.appearance.position === "bottom-right" && "bottom-4 right-4",
          config.appearance.position === "bottom-left" && "bottom-4 left-4",
          config.appearance.position === "top-right" && "top-4 right-4",
          config.appearance.position === "top-left" && "top-4 left-4",
        )}
      >
        {/* Chat Window */}
        {isExpanded && (
          <div
            className="mb-4 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-xl border overflow-hidden"
            style={{ borderRadius: `${config.appearance.borderRadius}px` }}
          >
            {/* Header */}
            <div
              className="p-4 text-white"
              style={{ backgroundColor: config.appearance.primaryColor }}
            >
              <div className="flex items-center space-x-3">
                {config.appearance.showAvatar && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=agent" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <h3 className="font-medium">{config.branding.title}</h3>
                  {config.branding.subtitle && (
                    <p className="text-xs opacity-90">
                      {config.branding.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 h-64 overflow-y-auto space-y-4">
              <div className="flex items-start space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=agent" />
                  <AvatarFallback className="text-xs">AI</AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm max-w-xs">
                  {config.behavior.welcomeMessage}
                </div>
              </div>

              <div className="flex items-start space-x-2 justify-end">
                <div
                  className="p-3 rounded-lg text-sm max-w-xs text-white"
                  style={{ backgroundColor: config.appearance.primaryColor }}
                >
                  I need help with my order
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=agent" />
                  <AvatarFallback className="text-xs">AI</AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm max-w-xs">
                  I'd be happy to help with your order. Could you please provide
                  your order number?
                </div>
              </div>

              {config.behavior.enableTypingIndicator && (
                <div className="flex items-start space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=agent" />
                    <AvatarFallback className="text-xs">AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder={config.behavior.placeholderText}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  style={{ backgroundColor: config.appearance.primaryColor }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {config.appearance.showBranding && (
              <div className="px-4 pb-2">
                <p className="text-xs text-center text-muted-foreground">
                  Powered by {config.branding.companyName}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Launcher Button */}
        <div className="flex justify-end">
          <Button
            size="icon"
            className={cn(
              "h-14 w-14 rounded-full shadow-lg",
              config.appearance.size === "small" && "h-12 w-12",
              config.appearance.size === "large" && "h-16 w-16",
            )}
            style={{ backgroundColor: config.appearance.primaryColor }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function EmbedCodeGenerator({ config }: { config: WidgetConfig }) {
  const { toast } = useToast();

  const embedCode = `<!-- ChatWidget Embed Code -->
<script>
  window.ChatWidgetConfig = {
    primaryColor: "${config.appearance.primaryColor}",
    position: "${config.appearance.position}",
    title: "${config.branding.title}",
    welcomeMessage: "${config.behavior.welcomeMessage}",
    autoOpen: ${config.behavior.autoOpen},
    showAvatar: ${config.appearance.showAvatar}
  };
</script>
<script src="https://cdn.chatwidget.com/widget.js" async></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Copied!",
      description: "Embed code copied to clipboard",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Code className="h-5 w-5" />
          <span>Embed Code</span>
        </CardTitle>
        <CardDescription>
          Copy this code and paste it before the closing &lt;/body&gt; tag on
          your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{embedCode}</code>
          </pre>
          <Button
            size="sm"
            variant="outline"
            className="absolute top-2 right-2"
            onClick={copyToClipboard}
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
        </div>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> The widget will automatically initialize when
            the page loads. Make sure to replace the CDN URL with your actual
            widget URL.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function WidgetConfigSection() {
  const [config, setConfig] = useState<WidgetConfig>(defaultConfig);
  const [activeTab, setActiveTab] = useState("appearance");
  const { toast } = useToast();

  const updateConfig = (
    section: keyof WidgetConfig,
    key: string,
    value: any,
  ) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const saveConfig = () => {
    // Here you would save the config to your backend
    toast({
      title: "Configuration Saved",
      description: "Your widget configuration has been updated successfully.",
    });
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    toast({
      title: "Configuration Reset",
      description: "Widget configuration has been reset to defaults.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="outline" className="mb-2">
            <Eye className="h-3 w-3 mr-1" />
            Live Preview
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="appearance"
                className="flex items-center space-x-2"
              >
                <Palette className="h-4 w-4" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger
                value="behavior"
                className="flex items-center space-x-2"
              >
                <Settings className="h-4 w-4" />
                <span>Behavior</span>
              </TabsTrigger>
              <TabsTrigger
                value="branding"
                className="flex items-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Branding</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Visual Appearance</CardTitle>
                  <CardDescription>
                    Customize how your chat widget looks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-8 h-8 rounded-full border"
                          style={{
                            backgroundColor: config.appearance.primaryColor,
                          }}
                        />
                        <Input
                          id="primaryColor"
                          type="color"
                          value={config.appearance.primaryColor}
                          onChange={(e) =>
                            updateConfig(
                              "appearance",
                              "primaryColor",
                              e.target.value,
                            )
                          }
                          className="w-20"
                        />
                        <Input
                          value={config.appearance.primaryColor}
                          onChange={(e) =>
                            updateConfig(
                              "appearance",
                              "primaryColor",
                              e.target.value,
                            )
                          }
                          placeholder="#3b82f6"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Select
                        value={config.appearance.position}
                        onValueChange={(value) =>
                          updateConfig("appearance", "position", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
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
                      <Label htmlFor="size">Button Size</Label>
                      <Select
                        value={config.appearance.size}
                        onValueChange={(value) =>
                          updateConfig("appearance", "size", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="borderRadius">Border Radius (px)</Label>
                      <Input
                        id="borderRadius"
                        type="number"
                        value={config.appearance.borderRadius}
                        onChange={(e) =>
                          updateConfig(
                            "appearance",
                            "borderRadius",
                            e.target.value,
                          )
                        }
                        min="0"
                        max="24"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showAvatar">Show Agent Avatar</Label>
                        <p className="text-sm text-muted-foreground">
                          Display avatar in chat messages
                        </p>
                      </div>
                      <Switch
                        id="showAvatar"
                        checked={config.appearance.showAvatar}
                        onCheckedChange={(checked) =>
                          updateConfig("appearance", "showAvatar", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showBranding">Show Branding</Label>
                        <p className="text-sm text-muted-foreground">
                          Display "Powered by" text
                        </p>
                      </div>
                      <Switch
                        id="showBranding"
                        checked={config.appearance.showBranding}
                        onCheckedChange={(checked) =>
                          updateConfig("appearance", "showBranding", checked)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="behavior" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Widget Behavior</CardTitle>
                  <CardDescription>
                    Configure how your widget behaves
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="welcomeMessage">Welcome Message</Label>
                    <Textarea
                      id="welcomeMessage"
                      value={config.behavior.welcomeMessage}
                      onChange={(e) =>
                        updateConfig(
                          "behavior",
                          "welcomeMessage",
                          e.target.value,
                        )
                      }
                      placeholder="Hello! How can I help you today?"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="placeholderText">Input Placeholder</Label>
                    <Input
                      id="placeholderText"
                      value={config.behavior.placeholderText}
                      onChange={(e) =>
                        updateConfig(
                          "behavior",
                          "placeholderText",
                          e.target.value,
                        )
                      }
                      placeholder="Type your message..."
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoOpen">Auto-open Widget</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically open chat after page load
                        </p>
                      </div>
                      <Switch
                        id="autoOpen"
                        checked={config.behavior.autoOpen}
                        onCheckedChange={(checked) =>
                          updateConfig("behavior", "autoOpen", checked)
                        }
                      />
                    </div>

                    {config.behavior.autoOpen && (
                      <div className="space-y-2 ml-4">
                        <Label htmlFor="autoOpenDelay">
                          Auto-open Delay (seconds)
                        </Label>
                        <Input
                          id="autoOpenDelay"
                          type="number"
                          value={config.behavior.autoOpenDelay}
                          onChange={(e) =>
                            updateConfig(
                              "behavior",
                              "autoOpenDelay",
                              parseInt(e.target.value),
                            )
                          }
                          min="0"
                          max="30"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enableTypingIndicator">
                          Typing Indicator
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Show when AI is typing
                        </p>
                      </div>
                      <Switch
                        id="enableTypingIndicator"
                        checked={config.behavior.enableTypingIndicator}
                        onCheckedChange={(checked) =>
                          updateConfig(
                            "behavior",
                            "enableTypingIndicator",
                            checked,
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enableSoundNotifications">
                          Sound Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Play sound for new messages
                        </p>
                      </div>
                      <Switch
                        id="enableSoundNotifications"
                        checked={config.behavior.enableSoundNotifications}
                        onCheckedChange={(checked) =>
                          updateConfig(
                            "behavior",
                            "enableSoundNotifications",
                            checked,
                          )
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="branding" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Branding & Content</CardTitle>
                  <CardDescription>
                    Customize your brand appearance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Widget Title</Label>
                      <Input
                        id="title"
                        value={config.branding.title}
                        onChange={(e) =>
                          updateConfig("branding", "title", e.target.value)
                        }
                        placeholder="Chat with us"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={config.branding.subtitle}
                        onChange={(e) =>
                          updateConfig("branding", "subtitle", e.target.value)
                        }
                        placeholder="We're here to help"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={config.branding.companyName}
                        onChange={(e) =>
                          updateConfig(
                            "branding",
                            "companyName",
                            e.target.value,
                          )
                        }
                        placeholder="ChatWidget"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="logoUrl">Logo URL</Label>
                      <Input
                        id="logoUrl"
                        value={config.branding.logoUrl}
                        onChange={(e) =>
                          updateConfig("branding", "logoUrl", e.target.value)
                        }
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Live Preview</span>
              </CardTitle>
              <CardDescription>
                See how your widget will appear on your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WidgetPreview config={config} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Embed Code */}
      <EmbedCodeGenerator config={config} />
    </div>
  );
}
