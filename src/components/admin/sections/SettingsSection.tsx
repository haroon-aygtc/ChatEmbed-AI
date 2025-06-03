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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import {
  Settings,
  Shield,
  Database,
  Bell,
  Mail,
  Globe,
  Key,
  Server,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface SystemStatus {
  database: "connected" | "disconnected" | "error";
  ai_services: "active" | "inactive" | "partial";
  websocket: "connected" | "disconnected";
  storage: "healthy" | "warning" | "critical";
}

interface NotificationSettings {
  email_notifications: boolean;
  push_notifications: boolean;
  chat_alerts: boolean;
  system_alerts: boolean;
  weekly_reports: boolean;
}

interface SecuritySettings {
  two_factor_enabled: boolean;
  session_timeout: number;
  ip_whitelist_enabled: boolean;
  api_rate_limiting: boolean;
  audit_logging: boolean;
}

interface SystemSettings {
  maintenance_mode: boolean;
  debug_mode: boolean;
  cache_enabled: boolean;
  auto_backup: boolean;
  data_retention_days: number;
}

export function SettingsSection() {
  const [systemStatus] = useState<SystemStatus>({
    database: "connected",
    ai_services: "active",
    websocket: "connected",
    storage: "healthy",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email_notifications: true,
    push_notifications: false,
    chat_alerts: true,
    system_alerts: true,
    weekly_reports: true,
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    two_factor_enabled: false,
    session_timeout: 30,
    ip_whitelist_enabled: false,
    api_rate_limiting: true,
    audit_logging: true,
  });

  const [system, setSystem] = useState<SystemSettings>({
    maintenance_mode: false,
    debug_mode: false,
    cache_enabled: true,
    auto_backup: true,
    data_retention_days: 90,
  });

  const [apiKeys, setApiKeys] = useState({
    openai: "••••••••••••••••",
    gemini: "••••••••••••••••",
    huggingface: "••••••••••••••••",
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
      case "active":
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
      case "partial":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "disconnected":
      case "inactive":
      case "error":
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
      case "active":
      case "healthy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "warning":
      case "partial":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "disconnected":
      case "inactive":
      case "error":
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
    }
  };

  const handleSaveSettings = (section: string) => {
    toast({
      title: "Settings Updated",
      description: `${section} settings have been saved successfully.`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description:
        "Your data export is being prepared. You'll receive an email when it's ready.",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import Started",
      description: "Data import is in progress. This may take a few minutes.",
    });
  };

  const handleSystemReset = () => {
    toast({
      title: "System Reset Initiated",
      description: "System reset is in progress. Please wait...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-6 w-6" />
        <h2 className="text-2xl font-bold">System Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                System Status
              </CardTitle>
              <CardDescription>
                Monitor the health and status of your system components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span className="font-medium">Database</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(systemStatus.database)}
                    <Badge className={getStatusColor(systemStatus.database)}>
                      {systemStatus.database}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="font-medium">AI Services</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(systemStatus.ai_services)}
                    <Badge className={getStatusColor(systemStatus.ai_services)}>
                      {systemStatus.ai_services}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    <span className="font-medium">WebSocket</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(systemStatus.websocket)}
                    <Badge className={getStatusColor(systemStatus.websocket)}>
                      {systemStatus.websocket}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    <span className="font-medium">Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(systemStatus.storage)}
                    <Badge className={getStatusColor(systemStatus.storage)}>
                      {systemStatus.storage}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>
                Configure basic system settings and behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable maintenance mode to prevent user access
                  </p>
                </div>
                <Switch
                  checked={system.maintenance_mode}
                  onCheckedChange={(checked) =>
                    setSystem((prev) => ({
                      ...prev,
                      maintenance_mode: checked,
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable detailed logging for troubleshooting
                  </p>
                </div>
                <Switch
                  checked={system.debug_mode}
                  onCheckedChange={(checked) =>
                    setSystem((prev) => ({ ...prev, debug_mode: checked }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Cache Enabled</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable caching to improve performance
                  </p>
                </div>
                <Switch
                  checked={system.cache_enabled}
                  onCheckedChange={(checked) =>
                    setSystem((prev) => ({ ...prev, cache_enabled: checked }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="retention">Data Retention (Days)</Label>
                <Input
                  id="retention"
                  type="number"
                  value={system.data_retention_days}
                  onChange={(e) =>
                    setSystem((prev) => ({
                      ...prev,
                      data_retention_days: parseInt(e.target.value),
                    }))
                  }
                  className="w-32"
                />
              </div>
              <Button onClick={() => handleSaveSettings("General")}>
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security features and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for admin access
                  </p>
                </div>
                <Switch
                  checked={security.two_factor_enabled}
                  onCheckedChange={(checked) =>
                    setSecurity((prev) => ({
                      ...prev,
                      two_factor_enabled: checked,
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">IP Whitelist</Label>
                  <p className="text-sm text-muted-foreground">
                    Restrict access to specific IP addresses
                  </p>
                </div>
                <Switch
                  checked={security.ip_whitelist_enabled}
                  onCheckedChange={(checked) =>
                    setSecurity((prev) => ({
                      ...prev,
                      ip_whitelist_enabled: checked,
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">API Rate Limiting</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable rate limiting for API requests
                  </p>
                </div>
                <Switch
                  checked={security.api_rate_limiting}
                  onCheckedChange={(checked) =>
                    setSecurity((prev) => ({
                      ...prev,
                      api_rate_limiting: checked,
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">
                    Log all admin actions for security auditing
                  </p>
                </div>
                <Switch
                  checked={security.audit_logging}
                  onCheckedChange={(checked) =>
                    setSecurity((prev) => ({ ...prev, audit_logging: checked }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">
                  Session Timeout (Minutes)
                </Label>
                <Select
                  value={security.session_timeout.toString()}
                  onValueChange={(value) =>
                    setSecurity((prev) => ({
                      ...prev,
                      session_timeout: parseInt(value),
                    }))
                  }
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="480">8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => handleSaveSettings("Security")}>
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={notifications.email_notifications}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      email_notifications: checked,
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive browser push notifications
                  </p>
                </div>
                <Switch
                  checked={notifications.push_notifications}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      push_notifications: checked,
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Chat Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified of new chat messages
                  </p>
                </div>
                <Switch
                  checked={notifications.chat_alerts}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      chat_alerts: checked,
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">System Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified of system issues and updates
                  </p>
                </div>
                <Switch
                  checked={notifications.system_alerts}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      system_alerts: checked,
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly analytics reports
                  </p>
                </div>
                <Switch
                  checked={notifications.weekly_reports}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      weekly_reports: checked,
                    }))
                  }
                />
              </div>
              <Button onClick={() => handleSaveSettings("Notifications")}>
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys Management
              </CardTitle>
              <CardDescription>
                Manage your AI service API keys and integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="openai-key"
                    type="password"
                    value={apiKeys.openai}
                    onChange={(e) =>
                      setApiKeys((prev) => ({
                        ...prev,
                        openai: e.target.value,
                      }))
                    }
                    placeholder="sk-..."
                  />
                  <Button variant="outline" size="sm">
                    Test
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gemini-key">Google Gemini API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="gemini-key"
                    type="password"
                    value={apiKeys.gemini}
                    onChange={(e) =>
                      setApiKeys((prev) => ({
                        ...prev,
                        gemini: e.target.value,
                      }))
                    }
                    placeholder="AI..."
                  />
                  <Button variant="outline" size="sm">
                    Test
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hf-key">Hugging Face API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="hf-key"
                    type="password"
                    value={apiKeys.huggingface}
                    onChange={(e) =>
                      setApiKeys((prev) => ({
                        ...prev,
                        huggingface: e.target.value,
                      }))
                    }
                    placeholder="hf_..."
                  />
                  <Button variant="outline" size="sm">
                    Test
                  </Button>
                </div>
              </div>
              <Button onClick={() => handleSaveSettings("API Keys")}>
                Save API Keys
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Management</CardTitle>
              <CardDescription>
                Advanced system configuration and maintenance tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically backup system data daily
                  </p>
                </div>
                <Switch
                  checked={system.auto_backup}
                  onCheckedChange={(checked) =>
                    setSystem((prev) => ({ ...prev, auto_backup: checked }))
                  }
                />
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Clear Cache
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Optimize Database
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Generate Backup
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  System Health Check
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Management */}
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Import, export, and manage your system data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleExportData}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export All Data
                </Button>
                <Button
                  onClick={handleImportData}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Import Data
                </Button>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium text-red-600">Danger Zone</h4>
                <div className="border border-red-200 rounded-lg p-4 space-y-4">
                  <div>
                    <h5 className="font-medium">Reset System Settings</h5>
                    <p className="text-sm text-muted-foreground">
                      Reset all system settings to default values. This action
                      cannot be undone.
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Reset System
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will reset all system settings to their
                          default values. This action cannot be undone and may
                          affect system functionality.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleSystemReset}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Reset System
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
